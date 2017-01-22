// REACT-REDUX
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// APP COMPONENTS 
import ExerciseListExpand from './ExerciseListExpand'
import BarGraph from '../../components/BarGraph/BarGraph'

// UTILITIES
import { calculatePerformancePercentage, totalWorkoutSets, totalWorkoutWeight, topExercise } from '../../utils/calculators'

// BOOTSTRAP
import { Grid, Row, Col, ProgressBar, Jumbotron, Panel } from 'react-bootstrap'

// ASSETS
import ResultsImg from '../../../assets/ResultsCropped.png' 


export class Results extends React.Component {
  static propTypes = {
    workout: PropTypes.object.isRequired,
    userExercises: PropTypes.object.isRequired, 
  }

  state = {
    selectedExercise: null, 
  }

  handleSelectExercise = (exercise) => {
    this.setState({selectedExercise: exercise}); 
  }

  _renderSingleExerciseGraph = () => {
    const { selectedExercise } = this.state; 
    if (selectedExercise !== null) {
      return (
        <BarGraph {...selectedExercise} />
      )
    }
  }

  render() {
    const { workout } = this.props; 
    let totalWeight = totalWorkoutWeight(workout.exercises); 
    let exerciseCount = workout.exercises.length; 
    let setCount = totalWorkoutSets(workout.exercises);
    let bestLift = topExercise(workout.exercises).exercise

    return (
      <Grid className='resultsGrid' fluid={true}>
        <Jumbotron style={{backgroundImage: 'url(' + ResultsImg + ')', backgroundSize: 'cover', borderRadius: 0}}>
          <Row> 
            <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
              <Panel className='resultsPanel'>
                <Row>
                <Col className='resultsHeader' xs={10} md={10} xsOffset={1} mdOffset={1}>
                  <h1> PERFORMANCE </h1>
                </Col>
                </Row>
                <Row className='resultsPanelRow'>
                <Col xs={5} md={5} xsOffset={1} mdOffset={1}>
                  <h2> EXERCISES | </h2> <h3>{`${exerciseCount}`} </h3>
                </Col> 
                <Col xs={6} md={6}>
                  <h2>TOTAL SETS | </h2> <h3> {`${setCount}`} </h3>
                </Col> 
                </Row>
                <Row className='resultsPanelRow'>
                <Col xs={5} md={5} xsOffset={1} mdOffset={1}>
                  <h2> TOTAL WEIGHT | </h2> <h3> {`${totalWeight}`} </h3> <p>[lbs]</p>
                </Col> 
                <Col xs={5} md={5}>
                  <h2> POINTS | </h2> <h3> { Math.round(Math.random() * totalWeight)} </h3>
                </Col> 
                </Row>
                <Row className='resultsPanelRow'>
                <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
                  <h2> BEST LIFT | </h2><h3> {`  ${bestLift.toUpperCase()}`} </h3>
                </Col> 
                </Row>
                <Row className='resultsPanelRow'>
                <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
                  <ProgressBar className='resultsBar'
                    now={parseInt(calculatePerformancePercentage(workout.exercises))} 
                    label={`WORKOUT COMPLETION: ${calculatePerformancePercentage(workout.exercises)} %`}
                  />
                </Col> 
                </Row>
              </Panel>
            </Col>
          </Row>
        </Jumbotron>
        <Row className='resultsGraph'>
          <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
            <Row>
              <Panel className='resultsGraphContainer'>
                <Row>
                  <Col className='resultsGraphHeader' xs={10} md={10} xsOffset={1} mdOffset={1}>
                    <h1> METRICS </h1>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} md={4}>
                    <ExerciseListExpand exercises={workout.exercises} selectExercise={this.handleSelectExercise}/>
                  </Col>
                  <Col xs={8} md={8}>
                    {this._renderSingleExerciseGraph()}
                  </Col> 
                </Row>
              </Panel>
            </Row>
          </Col>
        </Row>
      </Grid> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  workout: state.results.workout,
  userExercises: state.results.userExercises
})

export default connect(mapStateToProps, null)(Results)
