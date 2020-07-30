import React from "react";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Collapse
} from "shards-react";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar type="dark" theme="dark" expand="md">
                <NavbarBrand href="/">AntneeNet</NavbarBrand>
                    <Nav navbar className="ml-auto">
                        <InputGroup size="sm" seamless>
                            <InputGroupAddon type="prepend">
                            </InputGroupAddon>
                            <FormInput className="border-0" placeholder="Search..."/>
                        </InputGroup>
                    </Nav>
            </Navbar>
        );
    }
}
