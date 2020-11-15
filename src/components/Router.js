import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./routes/Home";
import {TrainerList} from "./routes/TrainerList";
import {Trainer} from "./routes/Trainer"
import '../App.css';
import Divider from "./Divider";

export default class Routs extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/trainer/" component={Trainer}/>
                    <Route path="/" component={TrainerList}/>
                </Switch>
            </Router>
        )
    }
}

function Manga() {
    return (
        <div style={{width:"100%"}}>
            <h3>
                Coom
            </h3>
            <Divider/>
        </div>
    )
}
