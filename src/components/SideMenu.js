import React from "react";

import {Menu, Layout} from "antd";
import {UserOutlined, VideoCameraOutlined} from "@ant-design/icons";

const {Sider} = Layout;

export default class SideMenu extends React.Component {
    render() {
        return (
            <Sider breakpoint="lg"
                   collapsedWidth="0"
                   theme={"dark"}
                   onBreakpoint={broken => {
                       console.log(broken);
                   }}
                   onCollapse={(collapsed, type) => {
                       console.log(collapsed, type);
                   }}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<VideoCameraOutlined/>}>
                        <a href={"/anime"}>
                            Anime
                        </a>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined/>}>
                        <a href={"/manga"}>
                            Manga
                        </a>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined/>}>
                        <a href={"/test"}>
                            test
                        </a>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}
