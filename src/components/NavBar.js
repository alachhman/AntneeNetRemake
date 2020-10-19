import React from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "shards-react";
import {Tooltip} from "antd";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar type="dark" theme="dark" expand="md">
                <NavbarBrand>AntneeNet</NavbarBrand>
                <Nav navbar className="ml-auto">
                    <Tooltip placement="left" title={"Sync Pairs"}>
                        <NavItem className={"LogoButton"}>
                            <NavLink active href="/">
                                <img
                                    src={"/pokeball.png"}
                                    alt={"pokeball"}
                                    style={{height: "30px", width: "30px"}}
                                />
                            </NavLink>
                        </NavItem>
                    </Tooltip>

                </Nav>
            </Navbar>
        );
    }
}
