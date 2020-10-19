import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from "antd";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import FooterBar from "./components/Footer";
import Routs from "./components/Router";

function App() {
    return (
        <div>
            <Layout style={{height: "100vh"}}>
                <div className={"Header"}>
                    <NavBar/>
                </div>
                <div className={"Body"}>
                    <Routs/>
                </div>
                <div className={"Footer"}>
                    <FooterBar/>
                </div>
            </Layout>
        </div>
    );
}

export default App;
