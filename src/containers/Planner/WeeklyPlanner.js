// // React-Redux Requirements 
// import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { browserHistory } from 'react-router';
// import { getTemplatesObjectsArray, getPlansObjectsArray } from '../../reducers/root'
// import { addTemplateToWeeklyPlan } from '../../actions/weeklyPlan'
// import { putNewUserPlan, updateUserPlan } from '../../actions/userWeeklyPlans'
// // import { createWorkoutFromTemplateMiddleware } from '../actions/workouts'
// // import { getAllUserWorkoutsConditional } from '../actions/userWorkouts'
// // import { getAllUserTemplatesConditional } from '../actions/userTemplates'
// // import { getAllUserExercisesConditional } from '../actions/userExercises'
// // import { searchAllExercises } from '../actions/allExercises'

// // App Components 
// import TemplateEntry from '../../components/UserProfile/TemplateEntry'
// // import WorkoutEntry from '../components/UserProfile/WorkoutEntry'

// // Bootstrap Imports 
// import { Grid, Row, Col, Button, Panel, Well, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

// export class WeeklyPlanner extends React.Component {
//   static propTypes = {
//     userID: PropTypes.string.isRequired, 
//     username: PropTypes.string.isRequired, 
//     templates: PropTypes.array.isRequired,
//   }

//   state = {
//     activeDay: 'Day1', 
//     availableDays: ['Day1','Day2','Day3','Day4','Day5','Day6','Day7'], 
//     weeklyPlanName: 'TestTest',
//     filterType: '',
//     filterPlan: ''
//   }

//   handleAddTemplateToWeeklyPlan = (templateID) => {
//     const { addTemplateToWeeklyPlan } = this.props;
//     let { activeDay, availableDays } = this.state; 
//     if (availableDays.indexOf(activeDay) === -1) {
//       return; 
//     }
//     addTemplateToWeeklyPlan(templateID, activeDay)
//   }

//   handleActiveDaySelection = (e) => {
//     e.preventDefault(); 
//     console.log(e.target.id)
//     this.setState({activeDay: e.target.id})
//   }

//   handleSaveWeeklyPlan = () => {
//     const { userID, username, weeklyPlan, update, putNewUserPlan, updateUserPlan } = this.props;  
//     if (!userID || !weeklyPlan) {
//       return; 
//     }

//     if (update) {
//       const { userID, weeklyPlanID, weeklyPlanName, templates } = weeklyPlan; 
//       console.log('Updating a plan!')
//       updateUserPlan(userID, weeklyPlanID, weeklyPlanName, templates)
//     } else {
//       const { userID, weeklyPlanID, templates } = weeklyPlan; 
//       const { weeklyPlanName } = this.state;
//       console.log('Saving a new plan!')
//       putNewUserPlan(userID, weeklyPlanID, weeklyPlanName, templates)
//     }

//     if (process.env.NODE_ENV !== 'test') {
//       browserHistory.push(`/User/${username}`);
//     }
//   }

//   handleFilterType = (e) => {
//     e.preventDefault();
//     this.setState({
//       filterType: e.target.value
//     }); 
//   }

//   handleFilterPlan = (e) => {
//     e.preventDefault(); 
//     this.setState({
//       filterPlan: e.target.value
//     }); 
//   }

//   _renderFilteredTemplates = () => {
//     let { filterType, filterPlan } = this.state; 
//     const { templates } = this.props; 
//     console.log(filterPlan); 
//     if (!filterType && !filterPlan) {
//       return (
//         <div>
//           {templates.map((template, i) => (
//             <TemplateEntry 
//               key={template.templateID} 
//               addTemplate={()=>{this.handleAddTemplateToWeeklyPlan(template.templateID)}} 
//               buttonText={'Add Template'}
//               {...template}
//             />
//           ))}
//         </div>
//       )
//     } else if (filterType) {
//       let filteredTemplates = templates.filter((template) => {
//         if (template.templateType === filterType) {
//           return template; 
//         }
//       })
//       return (
//         <div>
//           {filteredTemplates.map((template, i) => (
//             <TemplateEntry 
//               key={template.templateID} 
//               addTemplate={()=>{this.handleAddTemplateToWeeklyPlan(template.templateID)}} 
//               buttonText={'Add Template'}
//               {...template}
//             />
//           ))}
//         </div>
//       )
//     } else if (filterPlan) {
//       let filteredTemplates = templates.filter((template) => {
//         if (template.templatePlanID === filterPlan) {
//           return template; 
//         }
//       })
//       return (
//         <div>
//           {filteredTemplates.map((template, i) => (
//             <TemplateEntry 
//               key={template.templateID} 
//               addTemplate={()=>{this.handleAddTemplateToWeeklyPlan(template.templateID)}} 
//               buttonText={'Add Template'}
//               {...template}
//             />
//           ))}
//         </div>
//       )
//     }
//   }

//   render() {
//     const { username, templates, userPlans, weeklyPlan } = this.props; 
//     let planArray = Object.keys(weeklyPlan.templates)
//     console.log(planArray); 
//     planArray = planArray.map((key) => { 
//       return {
//         [`${key}`]: weeklyPlan.templates[`${key}`]
//       }
//     })

//     return (
//       <Grid> 
//         <h2> Plan New Week! </h2> 
//         <h4> Update: {JSON.stringify(this.props.update)} </h4> 
//         <Button className="template-button" bsSize="large" onClick={this.handleSaveWeeklyPlan}> Save Current Plan </Button> 
//         <Row> 
//           <Col xs={4} md={4}> 
//             {planArray.map((day, i) => (
//               <p key={i}> {JSON.stringify(day)} </p>
//             ))}
//           </Col> 
//           <Col xs={8} md={8}>
//             <Button id='Day1' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 1 </Button>
//             <Button id='Day2' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 2 </Button>
//             <Button id='Day3' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 3 </Button>
//             <Button id='Day4' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 4 </Button>
//             <Button id='Day5' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 5 </Button>
//             <Button id='Day6' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 6 </Button>
//             <Button id='Day7' onClick={(e)=>{this.handleActiveDaySelection(e)}}> Day 7 </Button>
//           </Col> 
//         </Row>
//         <Row> 
//           <Col xs={4} md={4}>
//             <h3 style={{color: 'gray'}}> {username} </h3>
//             <img src={'https://image.freepik.com/free-vector/crossfit-logo_23-2147494935.jpg'} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
//             <h2> Click Here to Start A New Workout! </h2> 
//           </Col> 
//           <Col xs={8} md={8}>
//             <Well>
//               <Row> 
//                 <Col xs={6} md={6}>
//                   <FormGroup>
//                     <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Type</ControlLabel>
//                     <FormControl componentClass="select" placeholder="select" id="filterType" onChange={(e) => this.handleFilterType(e)}>
//                       <option value="">Select</option>
//                       <option value="Chest">Chest</option>
//                       <option value="Back">Back</option>
//                       <option value="Legs">Legs</option>
//                       <option value="Shoulders">Shoulders</option>
//                       <option value="Arms">Arms</option>
//                     </FormControl>
//                   </FormGroup>
//                 </Col>
//                 <Col xs={6} md={6}>
//                   <FormGroup>
//                   <ControlLabel style={{marginBottom: '10px', fontSize: '16px'}}>Template Plan</ControlLabel>
//                   <FormControl componentClass="select" placeholder="select" id="filterPlan" onChange={(e) => this.handleFilterPlan(e)}>
//                     <option value="">Select</option>
//                     {userPlans.map((plan, i) => (
//                       <option key={i} value={plan.weeklyPlanID}>{plan.weeklyPlanName}</option>
//                     ))}
//                   </FormControl>
//                   </FormGroup>
//                 </Col>
//               </Row>
//             {this._renderFilteredTemplates()}
//             </Well>
//           </Col>
//         </Row> 
//       </Grid> 
//     )
//   }
// }

// const mapStateToProps = (state, { params }) => ({
//   userID: state.user.id, 
//   username: state.user.username,
//   templates: getTemplatesObjectsArray(state),
//   userPlans: getPlansObjectsArray(state), 
//   weeklyPlan: state.weeklyPlan, 
//   update: params.planID !== undefined
// })

// const mapDispatchToProps = (dispatch) => ({
//   addTemplateToWeeklyPlan: (templateID, day) => {
//     dispatch(addTemplateToWeeklyPlan(templateID, day))
//   },
//   putNewUserPlan: (userID, weeklyPlanID, weeklyPlanName, planTemplates) => {
//     dispatch(putNewUserPlan(userID, weeklyPlanID, weeklyPlanName, planTemplates))
//   }, 
//   updateUserPlan: (userID, weeklyPlanID, weeklyPlanName, planTemplates) => {
//     dispatch(updateUserPlan(userID, weeklyPlanID, weeklyPlanName, planTemplates))
//   }
// }) 

// export default connect(mapStateToProps, mapDispatchToProps)(WeeklyPlanner)
