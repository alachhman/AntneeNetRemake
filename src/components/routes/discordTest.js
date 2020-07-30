import React from "react";
import {Spin} from "antd";
import Divider from "../Divider";

require('es6-promise').polyfill();
const fetchJsonp = require("fetch-jsonp");
const request = require('request');
const Discord = require('discord.js');
const {prodToken, stagingToken, environment} = require('../../auth');
const client = new Discord.Client();

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "none",
            appInfo: "none"
        }
    }

    async componentDidMount() {
        await client.login(environment === "production" ? prodToken : stagingToken)
            .then(async x => await console.log("logged in as " + client.token));

        const appInfo = await consumeAppApi();
        let lists = appInfo.applist;
        let curQueue = appInfo.curQueueID;
        let curlist = [];
        for (let list in lists){
            if(parseInt(list) === curQueue){
                curlist = lists[parseInt(list)]
            }
        }
        let apps = curlist.map(x => x.id);
        const grabUsers = async () => await findGuild("583120259708616715")
            .then(await getGuildMembers)
            .then(async members => members
                .filter(member => apps.includes(member.id)))
            .then(async members =>
                await this.setState({
                    data: members,
                    appInfo: appInfo
                })
            )
            .catch(await handleError);

        //

        client.once('ready', async () => {
            await grabUsers().then(r => console.log("users grabbed."));
        });
    }

    render() {
        let display;

        if (this.state.data === "none") {
            display = (<Spin/>)
        } else {
            let list = this.state.data.map((y, i) => (
                <li key={i}>
                    <span>
                        <img alt={"user"} src={y.user.avatarURL()} style={{height:30, width:30, margin:"8px"}}/>
                    </span>
                    {y.user.username}
                </li>
            ));
            display = (
                <ul>
                    {list}
                </ul>
            );
        }

        return (
            <div style={{width: "100%"}}>
                <h3>
                    Ace Applicants
                </h3>
                <Divider/>
                {display}
            </div>
        )
    }
}

async function findGuild(id) {
    return client.guilds.cache.find(x => x.id === id);
}

async function getGuildMembers(guild) {
    let membersArr = [];
    await guild.members.cache.forEach((v, k) => {
        membersArr.push(v);
    });
    return membersArr;
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

async function consumeAppApi() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://ptown2.com/pokemas/acetrainer.json"; // site that doesn’t send Access-Control-*
    return await fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
