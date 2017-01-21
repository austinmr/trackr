import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginUser } from '../actions/user'
import Landing from '../../assets/LP.png' 
import { landingPageHeader } from '../style/style'

import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Jumbotron, Panel, Image, Modal } from 'react-bootstrap'

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
      <Jumbotron className="modal-container" style={{background: 'black', padding: 0, position: 'relative'}} > 
        <Modal show={true} backdrop={false} style={{position: 'absolute', left: 700, top: 100}}>

          <Modal.Body style={{background: 'black', color: 'white'}}>
            <h3 style={{width: 400, margin: '0 auto'}}> Achieve peak condition by tracking performance metrics and utilizing customized workout programs </h3>
            <Form onSubmit={e => this.loginUser(e)} style={{marginTop: 20}}>
              <FormGroup style={{textAlign: 'center'}}>
                <FormControl type="text" id="username" placeholder='Username' onChange={e => this.handleChange(e)} value={this.state.username} style={{margin: '0 auto', width: 400, textAlign: 'center', marginBottom: 15}}/>
                <FormControl type="text" id="password" placeholder='Password' onChange={e => this.handleChange(e)} value={this.state.username} style={{margin: '0 auto', width: 400, textAlign: 'center', marginBottom: 15}}/>
                <Button type="submit" style={{width: 400, margin: '0 auto', marginTop: '10px'}} bsSize="large" block onClick={e => this.loginUser(e)} >Log In</Button>  
              </FormGroup>
            </Form>
          </Modal.Body>

        </Modal> 
        <Image width="100%" src={Landing}/> 
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

// <Row style={{height: 50, color: 'white'}}>
//   <Col xs={10} md={10} xsOffset={2} mdOffset={2} >
//     <h1 style={landingPageHeader}> TRAIN HARDER </h1>
//     <h1 style={landingPageHeader}> TRACK <span style={{color: '#4ADDA5'}}>SMARTER </span> </h1> 
//   </Col>
// // </Row>
// <Form style={{height: '100px', width: '280px', borderRadius: '10px', backgroundColor: '#fff'}} onSubmit={e => this.loginUser(e)} >
//   <FormGroup style={{padding: '10px', height: '280px', textAlign: 'center'}}>
//     <ControlLabel style={{marginBottom: '10px', fontSize: '20px'}}>Log In To Trackr</ControlLabel>
//     <FormControl type="text" id="username" placeholder='Username' onChange={e => this.handleChange(e)} value={this.state.username} style={{margin: '0 auto', width: '210px', textAlign: 'center', marginBottom: '5px'}}/>
//     <Button type="submit" style={{width: '210px', margin: '0 auto', marginTop: '10px'}} bsSize="large" block onClick={e => this.loginUser(e)} >Log In</Button>  
//   </FormGroup>
// </Form>