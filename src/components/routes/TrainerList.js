import React, {useEffect, useState} from "react";
import {Card, List, Spin, Input, Button} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import Divider from "../Divider";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const {Meta} = Card;
const {Search} = Input;

export function TrainerList(props) {
    const [trainers, setTrainers] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const fetchTrainerData = async () => {
        setTrainers(await fetch("https://pokemasdb.com/trainer")
            .then(response => response.json())
            .then(json => json.trainers))
    };
    const handleFilter = (input) => {
        if (input === "") {
            setIsFiltered(false);
        } else {
            setIsFiltered(true);
            setFilteredList(trainers.filter(x => x.name.toUpperCase().includes(input.toUpperCase())))
        }
    };

    useEffect(() => {
        document.title = "Antnee.net | Sync Pairs";
        fetchTrainerData().then(x => x)
    }, []);

    if (trainers.length < 1) {
        return (
            <div>
                <h3>
                    Sync Pairs
                </h3>
                <Divider/>
                <Spin indicator={antIcon} className={"Loading"}/>
            </div>
        )
    } else {
        return (
            <div style={{width:"100%"}}>
                <h2>
                    Sync Pairs
                </h2>
                <Divider/>
                <div>
                    <Search
                        style={{borderRadius: "25px", marginBottom: "16px"}}
                        bordered={false}
                        placeholder="Enter the name of a trainer."
                        enterButton={<Button style={{backgroundColor: "#11197c"}}>Search →</Button>}
                        size="default"
                        onSearch={value => handleFilter(value)}
                    />
                </div>
                <Divider/>
                <List
                    grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3,}}
                    dataSource={isFiltered ? filteredList : trainers}
                    renderItem={item => (
                        <List.Item>
                            <TrainerDisplay trainer={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

const TrainerDisplay = (props) => {
    const trainerData = props.trainer;
    return (
        <a href={"#/trainer/" + trainerData.name}>
            <Card style={{
                background: "#5a6169",
                borderRadius: "25px",
            }}>
                <Meta
                    title={<h4>{trainerData.name + " "} &rarr;</h4>}
                    description={
                        <div className={"CardImageContainer"}>
                            <img className={"CardImage"} src={trainerData.image} alt={trainerData.name}/>
                        </div>
                    }
                />
            </Card>
        </a>
    )
};
