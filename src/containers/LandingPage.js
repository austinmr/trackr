import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginUser } from '../actions/user' 

import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Jumbotron, Panel } from 'react-bootstrap'

export class LandingPage extends React.Component {
  static propTypes = {
    dispatchLoginUser: PropTypes.func.isRequired,
  }

  state = {
    username: '',
  }

  handleChange = (e) => {
    this.setState({
      [`${e.target.id}`]: e.target.value,
    }); 
  }

  loginUser = (e) => {
    e.preventDefault();  
    let username = this.state.username; 
    if (!username) {
      return; 
    }
    this.props.dispatchLoginUser(username);
    
    // Prevent 'SecurityError' message from Jest 
    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/User/${username}`);
    }
  }

  render() {
    return (
      <Jumbotron style={{
       'backgroundImage': 'url(https://s-media-cache-ak0.pinimg.com/originals/45/e9/18/45e918a4ac64084b5ea5a5e2d7b67471.jpg)',
       'backgroundSize': 'cover',
       'height': 1000
      }}> 
        <Row>
          <h2> Peak Performance Through Metrics </h2>
        </Row>
        <Row>
          <Col xs={4} md={4} xsOffset={8} mdOffset={8}> 
          <Form style={{height: '280px', width: '280px', borderRadius: '10px', backgroundColor: '#fff'}} onSubmit={e => this.loginUser(e)} >
            <FormGroup style={{padding: '10px', height: '280px', textAlign: 'center'}}>
              <ControlLabel style={{marginBottom: '10px', fontSize: '20px'}}>Log In To Trackr</ControlLabel>
              <FormControl type="text" id="username" placeholder='Username' onChange={e => this.handleChange(e)} value={this.state.username} style={{margin: '0 auto', width: '210px', textAlign: 'center', marginBottom: '5px'}}/>
              <Button type="submit" style={{width: '210px', margin: '0 auto', marginTop: '10px'}} bsSize="large" block onClick={e => this.loginUser(e)} >Log In</Button>  
            </FormGroup>
          </Form>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginUser: (username) => {
    dispatch(loginUser(username))
  },
}) 

export default connect(null, mapDispatchToProps)(LandingPage)
