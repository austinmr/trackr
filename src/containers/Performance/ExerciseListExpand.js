import React, { PropTypes } from 'react'
import { Accordion, Panel } from 'react-bootstrap';

export default class ExerciseListExpand extends React.Component {
  static propTypes = {
    exercises: PropTypes.array.isRequired,
  }

  state = {
    activeKey: null,
  }

  handleSelectPanel = (e) => {
    let activeKey = e; 
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
          const {id, exercise } = exerciseObject;
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