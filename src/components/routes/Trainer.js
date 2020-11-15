import React, {useEffect, useState} from "react";
import Divider from "../Divider";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Col, Container, Row} from "shards-react";
import {Box, DataTable, Meter, Tab, Table, TableBody, TableCell, TableHeader, TableRow, Tabs, Text} from "grommet/es6";
import {getPKMNIcon} from "./pokedex";


const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

export function Trainer() {
    const [trainer] = useState(window.location.href.split("/trainer/")[1]);
    const [trainerData, setTrainerData] = useState({});
    const fetchTrainerData = async () => {
        setTrainerData(await fetch("http://pokemasdb.com/trainer/" + trainer)
            .then(response => response.json()))
    };

    useEffect(() => {
        document.title = "Antnee.net | " + trainer;
        fetchTrainerData().then(x => x);
    }, []);
    if (trainerData.name) {
        console.log(trainerData);
        return (
            <div style={{width: "100%"}}>
                <h1>
                    {trainerData.name + " - "}
                    <strong>
                        {trainerData.rarity}
                    </strong>
                    <img src={process.env.PUBLIC_URL + '/assets/star.png'}
                         height={32}
                         width={32}
                         alt={"star"}
                    />
                </h1>
                <Divider/>
                <TrainerInfo unit={trainerData}/>
                <Divider/>
                <PkmnLevelInfo pkmn={trainerData.pokemonData}/>
            </div>
        )
    } else {
        return (
            <Spin indicator={antIcon} className={"Loading"}/>
        )
    }

}

function TrainerInfo(props) {
    const trainer = props.unit;
    return (
        <div>
            <Row>
                <Col>
                    <div className={"ImageContainer"}>
                        <img
                            className={"image"}
                            height={"360"}
                            width={"auto"}
                            src={trainer.image}
                            alt={'trainer'}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

function PkmnLevelInfo(props) {
    const ownedPkmn = props.pkmn;
    const returnValues = ownedPkmn.map((pkmn) => {
        const icon = getPKMNIcon(pkmn.name.split(" (")[0]);
        return (
            <div>
                <div style={{marginBottom: "8px", marginTop: "8px"}}>
                    <strong>
                        <h3>
                            <span>
                                <img
                                    src={icon}
                                    alt={"pkmnIcon"}
                                />
                            </span>
                            {"  " + pkmn.name}
                        </h3>
                    </strong>
                    <Row>
                        <Col md>
                            <StatBlock pkmn={pkmn}/>
                        </Col>
                        <Col md>
                            <InfoBlock pkmn={pkmn}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MoveBlock pkmn={pkmn}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PassivesBlock passives={pkmn.passives}/>
                        </Col>
                    </Row>
                </div>
                <br/>
                <div className={"divider"}/>
            </div>
        )
    });
    return (
        <div className={"pokemonList"} style={{listStyleType: "none"}}>{returnValues}</div>
    )
}

function PassivesBlock(props) {
    const passives = props.passives;
    return (
        <Container className={"PassiveTable"}>
            <DataTable
                columns={[
                    {
                        property: "name",
                        header: <Text>Passives</Text>,
                        primary: true
                    },
                    {
                        property: "description"
                    }
                ]}
                data={passives}
            />
        </Container>
    )
}

function InfoBlock(props) {
    const pkmn = props.pkmn;
    return (
        <div>
            <Container className={"InfoTable"}>
                <Table>
                    <TableHeader>
                        <TableCell scope="col" border="bottom">
                            Type
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Weakness
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Role
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Row>
                                    <Col>
                                        {
                                            pkmn.typing.map(x =>
                                                <img
                                                    src={process.env.PUBLIC_URL + '/assets/' + x.toLowerCase() + '.png'}
                                                    alt={"x"}
                                                    height={32}
                                                    width={32}
                                                />
                                            )
                                        }
                                    </Col>
                                </Row>
                            </TableCell>
                            <TableCell>
                                <span>
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/' + pkmn.weakness.toLowerCase() + '.png'}
                                            alt={"weakness"}
                                            height={32}
                                            width={32}/>
                                </span>
                            </TableCell>
                            <TableCell>
                                {pkmn.role.split(" ")[0]}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Container>
            <Container className={"SyncTable"}>
                <Table>
                    <TableHeader>
                        <TableCell scope="col" border="bottom">
                            Sync
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Power
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Type
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Cat.
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {pkmn.syncMove.name}
                            </TableCell>
                            <TableCell>
                                {pkmn.syncMove.power.min_power + "→" + pkmn.syncMove.power.max_power}
                            </TableCell>
                            <TableCell>
                                <img
                                    src={process.env.PUBLIC_URL + '/assets/' + pkmn.syncMove.type.replace(' ', '').toLowerCase() + '.png'}
                                    alt={"syncType"}
                                    height={(pkmn.syncMove.type !== "") ? 32 : 0}
                                    width={(pkmn.syncMove.type !== "") ? 32 : 0}
                                />
                            </TableCell>
                            <TableCell>
                                <img
                                    src={process.env.PUBLIC_URL + '/assets/' + categoryToImage(pkmn.syncMove.category) + '.png'}
                                    alt={"syncCategory"}
                                    height={25}
                                    width={50}
                                />
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
                <Text>
                    <blockquote>
                        {pkmn.syncMove.description}
                    </blockquote>
                </Text>
            </Container>
        </div>
    )
}

function StatBlock(props) {
    const pkmn = props.pkmn;
    return (
        <Container className={"StatsTable"}>
            <DataTable
                columns={[
                    {
                        property: 'name',
                        header: <Text>Stats</Text>,
                        primary: true,
                    },
                    {
                        property: 'value'
                    },
                    {
                        property: 'percent',
                        header: '',
                        render: datum => (
                            <Col>
                                <Box pad={{vertical: 'xsmall'}}>
                                    <Meter
                                        values={[{
                                            value: datum.percent.min,
                                            color: datum.percent.color
                                        }]}
                                        round={true}
                                        thickness="xsmall"
                                        size="small"
                                    />
                                </Box>
                                <Box pad={{vertical: 'xsmall'}}>
                                    <Meter
                                        values={[{
                                            value: datum.percent.max,
                                            color: datum.percent.maxColor
                                        }]}
                                        round={true}
                                        thickness="xsmall"
                                        size="small"
                                    />
                                </Box>
                            </Col>
                        ),
                    },
                ]}
                data={[
                    {
                        name: 'HP',
                        value: pkmn.stats.base[0][1] + "(" + pkmn.stats.max[0][1]+ ")",
                        percent: {
                            min: pkmn.stats.base[0][1] / 5,
                            minColor: (pkmn.stats.base[0][1] >= 400) ? "status-ok" : ((pkmn.stats.base[0][1] <= 200) ? "status-critical" : "status-warning"),
                            max: pkmn.stats.max.hp / 5,
                            maxColor: (pkmn.stats.max[0][1] >= 200) ? "status-ok" : ((pkmn.stats.max[0][1] <= 100) ? "status-critical" : "status-warning")
                        }
                    },
                    {
                        name: 'ATK',
                        value: pkmn.stats.base[1][1] + "(" + pkmn.stats.max[1][1] + ")",
                        percent: {
                            min: pkmn.stats.base[1][1] / 5,
                            minColor: (pkmn.stats.base[1][1] >= 200) ? "status-ok" : ((pkmn.stats.base[1][1] <= 100) ? "status-critical" : "status-warning"),
                            max: pkmn.stats.max[1][1] / 5,
                            maxColor: (pkmn.stats.max[1][1] >= 200) ? "status-ok" : ((pkmn.stats.max[1][1] <= 100) ? "status-critical" : "status-warning")
                        }
                    },
                    {
                        name: 'DEF',
                        value: pkmn.stats.base[2][1] + "(" + pkmn.stats.max[2][1] + ")",
                        percent: {
                            min: pkmn.stats.base[2][1] / 5,
                            minColor: (pkmn.stats.base[2][1] >= 200) ? "status-ok" : ((pkmn.stats.base[2][1] <= 100) ? "status-critical" : "status-warning"),
                            max: pkmn.stats.max[2][1] / 5,
                            maxColor: (pkmn.stats.max[2][1] >= 200) ? "status-ok" : ((pkmn.stats.max[2][1] <= 100) ? "status-critical" : "status-warning")
                        }
                    },
                    {
                        name: 'SPATK',
                        value: pkmn.stats.base[3][1] + "(" + pkmn.stats.max[3][1] + ")",
                        percent: {
                            min: pkmn.stats.base[3][1] / 5,
                            minColor: (pkmn.stats.base[3][1] >= 200) ? "status-ok" : ((pkmn.stats.base[3][1] <= 100) ? "status-critical" : "status-warning"),
                            max: pkmn.stats.max[3][1] / 5,
                            maxColor: (pkmn.stats.max[3][1] >= 200) ? "status-ok" : ((pkmn.stats.max[3][1] <= 100) ? "status-critical" : "status-warning")
                        }
                    },
                    {
                        name: 'SPDEF',
                        value: pkmn.stats.base[4][1] + "(" + pkmn.stats.max[4][1] + ")",
                        percent: {
                            min: pkmn.stats.base[4][1] / 5,
                            minColor: (pkmn.stats.base[4][1] >= 200) ? "status-ok" : ((pkmn.stats.base[4][1] <= 100) ? "status-critical" : "status-warning"),
                            max: pkmn.stats.max[4][1] / 5,
                            maxColor: (pkmn.stats.max[4][1] >= 200) ? "status-ok" : ((pkmn.stats.max[4][1] <= 100) ? "status-critical" : "status-warning")
                        }
                    },
                    {
                        name: 'SPD',
                        value: pkmn.stats.base[5][1] + "(" + pkmn.stats.max[5][1] + ")",
                        percent: {
                            min: pkmn.stats.base[5][1] / 5,
                            minColor: (pkmn.stats.base[5][1] >= 200) ? "status-ok" : ((pkmn.stats.base[5][1] <= 100) ? "status-critical" : "status-warning"),
                            max: pkmn.stats.max[5][1] / 5,
                            maxColor: (pkmn.stats.max[5][1] >= 200) ? "status-ok" : ((pkmn.stats.max[5][1] <= 100) ? "status-critical" : "status-warning")
                        }
                    },
                ]}
            />
        </Container>
    )
}

function MoveBlock(props) {
    const moves = props.pkmn.moves;
    let count = 0;
    const moveDatums = moves.map((move) => {
        count++;
        return (
            <Tab title={"M" + count}>
                <Container className={"MovesTable"}>
                    <div style={{marginTop: "12px", marginBottom: "8px"}}>
                        <Text>
                            <strong><img
                                src={process.env.PUBLIC_URL + '/assets/' + categoryToImage(move.category) + '.png'}
                                alt={"category"}/>{"  " + move.name}:</strong>
                        </Text>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>POW</TableCell>
                                <TableCell>ACC</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Uses/Cost</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {(move.power.max_power > 0) ? (move.power.min_power + "→" + move.power.max_power) : "-"}
                                </TableCell>
                                <TableCell>
                                    {(move.accuracy > 0) ? move.accuracy : "-"}
                                </TableCell>
                                <TableCell>
                                    <TypeOrNah type={move.type}/>
                                </TableCell>
                                <TableCell>
                                    {(move.cost !== '') ? (move.cost + " cost") : (move.uses + " uses")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div style={{marginBottom: "8px"}}>
                        <Text>
                            <strong>Target: </strong>{move.target}
                        </Text>
                        <br/>
                        <Text>
                            <strong>Description: </strong>{move.effect}
                        </Text>
                    </div>

                </Container>
            </Tab>
        )
    });
    return (
        <Tabs>
            {moveDatums}
        </Tabs>
    )
}

function TypeOrNah(props) {
    const type = props.type;
    if (type === "") {
        return ("-")
    } else {
        return (
            <img src={process.env.PUBLIC_URL + '/assets/' + type.toLowerCase() + '.png'}
                 alt={"type"}
                 height={32}
                 width={32}
            />
        )
    }
}


function categoryToImage(category) {
    switch (category) {
        case "Status Effect":
            return 'status';
        case "Special":
            return 'special';
        case "Physical":
            return 'physical';
        default:
            return 'status';
    }
}
