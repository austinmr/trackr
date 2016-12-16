import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';


class NavigationBar extends React.Component {
  handleNavigation(event) {
    event.preventDefault();
    var route = event.target.title; 
    browserHistory.push(`${route}`);
  }

  render() {
    return (
        <Navbar style={{ 'marginBottom': '2px', height: '80px', background: 'black'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a style={{'marginTop': '20px', 'fontSize': '40px', 'fontFamily': 'ModernSans', 'color':'white'}}>TRACKR</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
            <Nav>
              <NavItem className="navHeader" onClick={(e) => {this.handleNavigation(e)}} title={'/Nav1'}> Nav1 </NavItem>
              <NavItem className="navHeader" onClick={(e) => {this.handleNavigation(e)}} title={'/Nav2'}> Nav2 </NavItem>
              <NavItem className="navHeader" onClick={(e) => {this.handleNavigation(e)}} title={'/Nav3'}> Nav3 </NavItem>
              <NavItem className="navHeader" onClick={(e) => {this.handleNavigation(e)}} title={'/Nav4'}> Nav4 </NavItem>
            </Nav>
        </Navbar>
    ); 
  }
}

export default NavigationBar; 