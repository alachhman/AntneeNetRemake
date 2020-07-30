import Divider from "../../../../untitled1/src/components/Divider";
import React from "react";
import {Spin} from "antd";

export default class Anime extends React.Component {
    // Make the HTTP Api request
    constructor(props) {
        super(props);
        this.state = {
            data: "none"
        }
    }

    async componentDidMount() {
        const query = async () => await fetch(url, options)
            .then(await handleResponse)
            .then(async data => {
                this.setState({
                    data: await handleData(data)
                })
            })
            .catch(await handleError);
        await query().then(r => console.log(r));
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <h3>
                    Anime
                </h3>
                <Divider/>
                {
                    (this.state.data === "none") ? (<Spin/>) :
                        <div>
                            {this.state.data.data.Media.title.english}
                            <br/>
                            {
                                calcTimeLeft(this.state.data.data.AiringSchedule.airingAt)
                            }
                        </div>
                }
            </div>
        )
    }
}

function calcTimeLeft(timeStamp) {
    let days =  new Date(new Date(timeStamp * 1000).getTime() - Date.now()) / 1000 / 60 / 60 / 24;
    let hourRemainder = days - Math.floor(days);
    let hours = (hourRemainder) * 24;
    let minuteRemainder  = hours - Math.floor(hours);
    let minutes = (minuteRemainder) * 60;
    console.log(hours, minuteRemainder);
    return Math.floor(days) + " days, " +  Math.floor(hours) + " hours, and " + Math.floor(minutes) + " minutes until the next episode";
}

var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    episodes
    season
    seasonYear
    title {
      romaji
      english
      native
    }
  }
  AiringSchedule (mediaId: $id, notYetAired: true) {
    episode
    airingAt
  }
}
`;

// Define our query variables and values that will be used in the query request
let variables = {
    id: 108632
};

// Define the config we'll need for our Api request
let url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };


function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
    return data
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
