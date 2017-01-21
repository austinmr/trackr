import React, { PropTypes } from 'react'
import { Row, Col, Accordion, Panel, Well } from 'react-bootstrap';

export default class ExerciseListExpand extends React.Component {
  static propTypes = {
    exercises: PropTypes.array.isRequired,
  }

  state = {
    activeKey: null,
  }

  // _renderExerciseSets(eventKey, sets) {
  //   const { activeKey } = this.state;
  //   if (eventKey === activeKey) {
  //     return (
  //       <div>
  //       <Row style={{borderBottom: '1px solid black', color: 'white'}}> 
  //         <Col xs={2} md={2}>
  //           <h4 style={{textAlign: "center"}}> set </h4>
  //         </Col> 
  //         <Col xs={5} md={5}>
  //           <h4 style={{textAlign: "center"}}> weight </h4>
  //         </Col> 
  //         <Col xs={5} md={5}>
  //           <h4 style={{textAlign: "center"}}> reps </h4>
  //         </Col> 
  //       </Row>
  //         {sets.map((set, i) => {
  //           const { id, weight, completedReps} = set; 
  //           return (  
  //             <Row key={id} style={{marginTop: 10}}> 
  //               <Col xs={2} md={2}>
  //                 <h4 style={{textAlign: "center"}}> {`${i+1}`} </h4>
  //               </Col> 
  //               <Col xs={5} md={5}>
  //                 <Well bsSize="small" style={{marginTop: 3, marginBottom: 3, marginLeft: 10, textAlign: "center"}}>
  //                   {`${weight}`}
  //                 </Well>
  //               </Col> 
  //               <Col xs={5} md={5} style={{marginTop: 5}}>
  //                 <Well bsSize="small" style={{marginTop: 3, marginBottom: 3, marginLeft: 10, textAlign: "center"}}>
  //                   {`${completedReps}`}
  //                 </Well>
  //               </Col> 
  //             </Row>
  //           )})}
  //       </div>
  //     )
  //   }
  // }

  // _renderExerciseSets(eventKey, sets) {
  //   const { activeKey } = this.state;
  //   if (eventKey === activeKey) {
  //     return (
  //       <div>
  //       <Row style={{color: 'white'}}> 
  //         <Col xs={2} md={2} style={{textAlign: "center"}}>
  //           <h5> set </h5>
  //         </Col> 
  //         <Col xs={5} md={5} style={{textAlign: "center"}}>
  //           <h5> weight </h5>
  //         </Col> 
  //         <Col xs={5} md={5} style={{textAlign: "center"}}>
  //           <h5> reps </h5>
  //         </Col> 
  //       </Row>
  //         {sets.map((set, i) => {
  //           const { id, weight, completedReps} = set; 
  //           return (  
  //             <Row key={id}> 
  //               <Col xs={2} md={2} style={{textAlign: "center"}}>
  //                 <h5> {`${i+1}`} </h5>
  //               </Col> 
  //               <Col xs={5} md={5} style={{textAlign: "center"}}>
  //                 <h5> {`${weight}`} </h5>
  //               </Col> 
  //               <Col xs={5} md={5} style={{textAlign: "center"}}>
  //                 <h5> {`${completedReps}`} </h5>
  //               </Col> 
  //             </Row>
  //           )})}
  //       </div>
  //     )
  //   }
  // }

  handleSelectPanel = (e) => {
    let activeKey = e; 
    console.log('SELECT FIRING!')
    const { exercises, selectExercise } = this.props; 
    const exerciseID = exercises[activeKey]; 
    this.setState({activeKey: activeKey})
    selectExercise(exerciseID); 
  }

  render() {
    const { exercises } = this.props; 
    return (
      <Accordion className='resultsAccordion' onSelect={(e) => {this.handleSelectPanel(e)}}>
        {exercises.map((exerciseObject, i) => {
          const {id, exercise, sets, currentOneRepMax } = exerciseObject;
          const { activeKey } = this.state; 
          if (i === activeKey) {
            return (
              <Panel 
                key={'expand'+id}
                eventKey={i}
                className='resultsAccordionPanel selectedPanel'
                header={`${exercise.toUpperCase()}`}>
              </Panel>
            )
          } else {
            return (
              <Panel 
                key={'expand'+id}
                eventKey={i}
                className='resultsAccordionPanel'
                header={`${exercise}`}>
              </Panel>
            )
          }
        })}
      </Accordion>
    )
  }
}