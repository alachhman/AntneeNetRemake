import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./routes/Home";
import Anime from "./routes/Anime";
import Test from "./routes/discordTest";
import '../App.css';
import Divider from "./Divider";

export default class Routs extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/anime" component={Anime}/>
                    <Route exact path="/manga" component={Manga}/>
                    <Route exact path="/test" component={Test}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        )
    }
}

function Manga() {
    return (
        <div style={{width:"100%"}}>
            <h3>
                Manga
            </h3>
            <Divider/>
        </div>
    )
}
