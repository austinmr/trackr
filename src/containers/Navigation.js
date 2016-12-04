import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavigation(event) {
    event.preventDefault();
    var route = event.target.title; 
    browserHistory.push(`${route}`);
  }

  render() {
    return (
        <Navbar style={{'marginBottom': '2px', height: '40px'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a>TRACKR</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Nav1'}> Nav1 </NavItem>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Nav2'}> Nav2 </NavItem>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Nav3'}> Nav3 </NavItem>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Nav4'}> Nav4 </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    ); 
  }
}

export default NavigationBar; 