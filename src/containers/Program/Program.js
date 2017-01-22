// REACT-REDUX
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

// SELECTORS 
import { getTemplatesObjectsArray, getProgramsObjectsArray } from '../../reducers/root'

// ACTION CREATORS
import { addTemplateToProgram } from '../../actions/program'
import { putNewUserProgram, updateUserProgram } from '../../actions/userPrograms'

// APP COMPONENTS 
import TemplateEntry from '../../components/UserProfile/TemplateEntry'

// BOOTSTRAP
import { Grid, Row, Col, Button, Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class Program extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    templates: PropTypes.array.isRequired,
    userPrograms: PropTypes.array.isRequired,
    program: PropTypes.object.isRequired,
    update: PropTypes.bool.isRequired,
    addTemplateToProgram: PropTypes.func.isRequired,
    putNewUserProgram: PropTypes.func.isRequired,
    updateUserProgram: PropTypes.func.isRequired
  }

  state = {
    activeDay: 'Day1', 
    availableDays: ['Day1','Day2','Day3','Day4','Day5','Day6','Day7'], 
    programName: 'TestTest',
    filterType: '',
    filterPlan: ''
  }

  handleAddTemplateToProgram = (templateID) => {
    const { addTemplateToProgram } = this.props;
    let { activeDay, availableDays } = this.state; 
    if (availableDays.indexOf(activeDay) === -1) {
      return; 
    }
    addTemplateToProgram(templateID, activeDay)
  }

  handleActiveDaySelection = (e) => {
    e.preventDefault(); 
    this.setState({activeDay: e.target.id})
  }

  handleSaveProgram = () => {
    const { userID, username, program, update, putNewUserProgram, updateUserProgram } = this.props;  
    if (!userID || !program) {
      return; 
    }

    if (update) {
      const { userID, programID, programName, templates } = program; 
      updateUserProgram(userID, programID, programName, templates)
    } else {
      const { userID, programID, templates } = program; 
      const { programName } = this.state;
      putNewUserProgram(userID, programID, programName, templates)
    }

    if (process.env.NODE_ENV !== 'test') {
      browserHistory.push(`/User/${username}`);
    }
  }

  handleFilterType = (e) => {
    e.preventDefault();
    this.setState({
      filterType: e.target.value
    }); 
  }

  handleFilterPlan = (e) => {
    e.preventDefault(); 
    this.setState({
      filterPlan: e.target.value
    }); 
  }

  _renderFilteredTemplates = () => {
    let { filterType, filterPlan } = this.state; 
    const { templates } = this.props; 
    if (!filterType && !filterPlan) {
      return (
        <div>
          {templates.map((template, i) => (
            <TemplateEntry 
              key={template.templateID} 
              addTemplate={()=>{this.handleAddTemplateToProgram(template.templateID)}} 
              buttonText={'Add Template'}
              {...template}
            />
          ))}
        </div>
      )
    } else if (filterType) {
      let filteredTemplates = templates.filter((template) => {
        if (template.templateType === filterType) {
          return template; 
        }
      })
      return (
        <div>
          {filteredTemplates.map((template, i) => (
            <TemplateEntry 
              key={template.templateID} 
              addTemplate={()=>{this.handleAddTemplateToProgram(template.templateID)}} 
              buttonText={'Add Template'}
              {...template}
            />
          ))}
        </div>
      )
    } else if (filterPlan) {
      let filteredTemplates = templates.filter((template) => {
        if (template.templatePlanID === filterPlan) {
          return template; 
        }
      })
      return (
        <div>
          {filteredTemplates.map((template, i) => (
            <TemplateEntry 
              key={template.templateID} 
              addTemplate={()=>{this.handleAddTemplateToProgram(template.templateID)}} 
              buttonText={'Add Template'}
              {...template}
            />
          ))}
        </div>
      )
    }
  }

  render() {
    const { username, templates, userPrograms, program } = this.props; 
    let planArray = Object.keys(program.templates)
    planArray = planArray.map((key) => { 
      return {
        [`${key}`]: program.templates[`${key}`]
      }
    })

    return (
      <Grid> 
        <h2> Plan New Week! </h2> 
        <h4> Update: {JSON.stringify(this.props.update)} </h4> 
        <Button className="template-button" bsSize="large" onClick={this.handleSaveProgram}> Save Current Program </Button> 
        <Row> 
          <Col xs={4} md={4}> 
            {planArray.map((day, i) => (
              <p key={i}> {JSON.stringify(day)} </p>
            ))}
          </Col> 
          <Col xs={8} md={8}>
            <Button id='Day1' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 1 </Button>
            <Button id='Day2' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 2 </Button>
            <Button id='Day3' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 3 </Button>
            <Button id='Day4' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 4 </Button>
            <Button id='Day5' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 5 </Button>
            <Button id='Day6' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 6 </Button>
            <Button id='Day7' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 7 </Button>
          </Col> 
        </Row>
        <Row> 
          <Col xs={4} md={4}>
            <h3 style={{color: 'gray'}}> {username} </h3>
            <img src={'https://image.freepik.com/free-vector/crossfit-logo_23-2147494935.jpg'} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
            <h2> Click Here to Start A New Workout! </h2> 
          </Col> 
          <Col xs={8} md={8}>
            <Well>
              <Row> 
                <Col xs={6} md={6}>
                  <FormGroup>
                    <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Type</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" id="filterType" onChange={(e) => this.handleFilterType(e)}>
                      <option value="">Select</option>
                      <option value="Chest">Chest</option>
                      <option value="Back">Back</option>
                      <option value="Legs">Legs</option>
                      <option value="Shoulders">Shoulders</option>
                      <option value="Arms">Arms</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <FormGroup>
                    <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Plan</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" id="filterPlan" onChange={(e) => this.handleFilterPlan(e)}>
                      <option value="">Select</option>
                      {userPrograms.map((program, i) => (
                        <option key={i} value={program.programID}>{program.programName}</option>
                      ))}
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
            {this._renderFilteredTemplates()}
            </Well>
          </Col>
        </Row> 
      </Grid> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  userID: state.user.id, 
  username: state.user.username,
  templates: getTemplatesObjectsArray(state),
  userPrograms: getProgramsObjectsArray(state), 
  program: state.program, 
  update: params.programID !== undefined
})

const mapDispatchToProps = (dispatch) => ({
  addTemplateToProgram: (templateID, day) => {
    dispatch(addTemplateToProgram(templateID, day))
  },
  putNewUserProgram: (userID, programID, programName, programTemplates) => {
    dispatch(putNewUserProgram(userID, programID, programName, programTemplates))
  }, 
  updateUserProgram: (userID, programID, programName, programTemplates) => {
    dispatch(updateUserProgram(userID, programID, programName, programTemplates))
  }
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Program)
