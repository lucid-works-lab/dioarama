import {Navbar, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';

export default (props) => (
    <Navbar inverse >
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Diorama Console</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavDropdown eventKey={3} title="Mocks" id="basic-nav-dropdown">
                    <LinkContainer to="/mock/overview"><MenuItem eventKey={3.1}>Overview</MenuItem></LinkContainer>
                    <MenuItem divider/>
                    {props.mocks.map((mock, index) => <LinkContainer key={mock.mockId} to={"/mock/"+mock.mockId}><MenuItem eventKey={'3.'+index}>{mock.mockId}</MenuItem></LinkContainer>
                    )}
                </NavDropdown>
                <LinkContainer to="/requests"><NavItem eventKey={1}>Requests</NavItem></LinkContainer>
                {/*<LinkContainer to="/test-runner"><NavItem eventKey={2}>Test Runner</NavItem></LinkContainer>*/}
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="https://lucid.works/">LucidWorks</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

