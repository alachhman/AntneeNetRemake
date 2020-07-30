import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Empty, Layout, Menu} from "antd";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {UserOutlined, VideoCameraOutlined, UploadOutlined} from '@ant-design/icons';
import SideMenu from "./components/SideMenu";
import FooterBar from "./components/Footer";
import Routs from "./components/Router";
const {Content, Footer} = Layout;

function App() {
    return (
        <div>
            <Layout style={{height: "100vh"}}>
                <div className={"Header"}>
                    <NavBar/>
                </div>
                <Layout>
                    <SideMenu/>
                    <Layout>
                        <div className={"Body"}>
                            <Routs/>
                        </div>
                    </Layout>
                </Layout>
                <div className={"Footer"}>
                    <FooterBar/>
                </div>
            </Layout>
        </div>
    );
}

export default App;
