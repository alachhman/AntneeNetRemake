import React, {useEffect, useState} from "react";
import Divider from "../Divider";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

export function Trainer() {
    const [trainer] = useState(window.location.href.split("/trainer/")[1]);
    const [trainerData, setTrainerData] = useState([]);
    const fetchTrainerData = async () => {
        setTrainerData(await fetch("http://pokemasdb.com/trainer/" + trainer)
            .then(response => response.json()))
    };
    useEffect(() => {
        document.title = "Antnee.net | " + trainer;
        fetchTrainerData().then(x => x)
    });
    if(trainerData){
        return (
            <div style={{width:"100%"}}>
                <h2>
                    {trainerData.name}
                </h2>
                <Divider/>
            </div>
        )
    } else {
        return (
            <Spin indicator={antIcon} className={"Loading"}/>
        )
    }

}
