import React from "react";
import {Spin, Avatar, Tabs, Row, Button, Col, Space} from "antd";
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import Divider from "../Divider";

require('es6-promise').polyfill();

const Discord = require('discord.js');
const {prodToken, stagingToken, environment} = require('../../auth');
const client = new Discord.Client();
const {TabPane} = Tabs;

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "none",
            appInfo: "none",
            applicants: "none"
        }
    }

    async componentDidMount() {
        await client.login(environment === "production" ? prodToken : stagingToken)
            .then(async x => await console.log("logged in as " + client.token));

        const appInfo = await consumeAppApi();
        let lists = appInfo.applist;
        let curQueue = appInfo.curQueueID;
        let curlist = [];
        for (let list in lists) {
            if (parseInt(list) === curQueue) {
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
                    appInfo: appInfo,
                    applicants: curlist
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

        if (this.state.data === "none" || this.state.applicants === "none") {
            display = (<Spin style={{width: "100%"}}/>)
        } else {
            let list = this.state.data.map((y, i) => {
                let application;
                this.state.applicants.forEach(x => (x.id === y.user.id) ? application = x: "");
                return (
                    <ApplicantDisplay profile={y} application={application}/>
                )
            });
            display = (
                <Row>
                    {list}
                </Row>
            );
        }

        return (
            <div style={{width: "100%"}}>
                <h3>
                    Ace Applicants
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All Applicants" key="1">
                        {display}
                    </TabPane>
                    <TabPane tab="WatchListed Applicants" key="2">
                        Tab 2
                    </TabPane>
                    <TabPane tab="WatchList History" key="3">
                        Tab 3
                    </TabPane>
                </Tabs>
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
    const url = "https://ptown2.com/pokemas/acetrainer.json";
    return await fetch(proxyurl + url)
        .then(response => response.json())
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

function ApplicantDisplay(props){
    const application = props.application;
    const profile = props.profile;
    return (
        <div style={{
            border: "1px solid white",
            borderRadius: "25px",
            width: "100%",
            padding: "20px",
            margin: "6px",
        }}>
            <Row style={{marginBottom: "20px"}} type="flex" align="middle">
                <Col flex="1 1 150px">
                                <span>
                                <Avatar src={profile.user.avatarURL()}/> {profile.user.username + "#" + profile.user.discriminator}
                            </span>
                </Col>
                <Col flex="0 1 300px">
                    <div style={{
                        float: "right",
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Space size={"middle"}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<CheckOutlined/>}
                                style={{
                                    backgroundColor: "#41c046",
                                    border: "none",
                                    display: 'inline-block',
                                    verticalAlign: 'middle'
                                }}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<CloseOutlined/>}
                                danger
                                style={{
                                    display: 'inline-block',
                                    verticalAlign: 'middle'
                                }}
                            />
                        </Space>
                    </div>
                </Col>
            </Row>
            <Divider/>
            Favorite PKMN: {application.pokemon}
            <br/>
            Discord ID: {application.id}
            <br/>
            Time Applied: {new Date(application.time * 1000).toDateString()}
        </div>
    )
}
