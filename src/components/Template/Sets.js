import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap';
import { displayPercentage } from '../../utils/calculators'

const Sets = ({ sets, exerciseId }) => (
  <Table bordered> 
    <thead> 
      <tr>
        <th data-field="set">Set</th>
        <th data-field="weight">Weight</th>
        <th data-field="reps">Reps</th>
      </tr>
    </thead>
    <tbody> 
      {sets.map((set, i) => (
        <tr key={set.id}>
          <td> {i + 1} </td>
          <td> {`${set.reps} reps`} </td>
          <td> {`${displayPercentage(set.reps)} % of 1RM`} </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default Sets