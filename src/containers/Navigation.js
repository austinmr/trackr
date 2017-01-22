import React from 'react';
import { browserHistory } from 'react-router'
import { Nav, NavItem, Navbar } from 'react-bootstrap'

class NavigationBar extends React.Component {
  handleNavigation(event) {
    event.preventDefault();
    var route = event.target.title; 
    browserHistory.push(`${route}`);
  }

  render() {
    return (
        <Navbar style={{ 'marginBottom': 0, height: '80px', background: 'black', border: '2px solid black', borderRadius: 0}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a 
              style={{'marginTop': '20px', 'fontSize': '40px', 'fontFamily': 'ModernSans', 'color':'white'}} 
              onClick={(e) => {this.handleNavigation(e)}}
              title={'/User'}>
              TRACKR
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
            <Nav>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Nav1'} > PROFILE </NavItem>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Nav2'}> TRAIN </NavItem>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/PROGRAM'}> PROGRAM </NavItem>
              <NavItem onClick={(e) => {this.handleNavigation(e)}} title={'/Performance'}> PERFORMANCE </NavItem>
            </Nav>
        </Navbar>
    ); 
  }
}

export default NavigationBar; 