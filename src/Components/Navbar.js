import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class MainNav extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Car History Blockchain Platform</a>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav pullRight>
                {this.props.userId ?
                        <NavItem eventKey={5} href="#">
                            {this.props.userId} (357 Eth)
                        </NavItem> :
                        null}
                    {this.props.userId ? null :
                        <NavItem eventKey={1} href="#" onClick={this.props.onLoginClicked}>
                            Login
        </NavItem>}
                    {this.props.userId ? null :
                        <NavItem eventKey={2} href="#" onClick={this.props.onSignupClicked}>
                            Sign Up
        </NavItem>
                    }
                    {this.props.userId ?
                        <NavItem eventKey={4} href="#" onClick={this.props.onLogoutClicked}>
                            Log Out
        </NavItem> :
                        null}
                   


                </Nav>
            </Navbar>
        );
    }
}

export default MainNav;