// REACT-REDUX
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

// ACTION CREATORS 
import { loginUser } from '../actions/user'

// BOOTSTRAP
import { Form, FormGroup, FormControl, Button, Jumbotron, Image, Modal } from 'react-bootstrap'

// ASSETS
import Landing from '../../assets/LP.png' 

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