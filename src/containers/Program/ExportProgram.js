// REACT-REDUX
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// DEPENDENCIES
import _ from 'underscore'; 
import { convertExercisesArrayToCSV, exportPlan } from '../../utils/export'

export class ExportProgram extends React.Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    program: PropTypes.object.isRequired,
  }

  _renderDays = () => {
    const { program } = this.props; 
    let programArray = ['Day1','Day2','Day3','Day4','Day5','Day6','Day7'].map((day) => {
      let dayObject = program[day]; 
      if (dayObject === undefined) {
        dayObject = 'Rest Day'
      } else {
        dayObject = convertExercisesArrayToCSV(dayObject.exercises)
      }
      return dayObject; 
    }); 
    return (
      <div>
        {programArray.map((day, i) => (
          <p key={i}>{JSON.stringify(day)}</p>
        ))}
      </div>
    )
  }

  render() {
    const { program } = this.props; 
    let csvContent = exportPlan(program); 

    return (
      <div> 
        <h1> Export Page </h1>
        {this._renderDays()}
        <h3> CSV Export </h3>
        {JSON.stringify(csvContent)}
        <a href={encodeURI(csvContent)} download> DOWNLOAD </a>
      </div> 
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  userID: state.user.id, 
  program: state.program.exportObject
})

export default connect(mapStateToProps, null)(ExportProgram)