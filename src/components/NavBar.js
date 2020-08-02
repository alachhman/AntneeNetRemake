import React from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    InputGroup,
    InputGroupAddon,
    FormInput,
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
