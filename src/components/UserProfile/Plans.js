import React from 'react'
import { Row, Col, Panel, Well, Button } from 'react-bootstrap';
import PlanEntry from './PlanEntry'

export default ({ plans, editPlan, genWorkouts }) => {

  return (
    <Panel className='profileActivePanel'> 
      <Row> 
      <Col xs={10} md={10} xsOffset={1} mdOffset={1} className='profileActivePanelHeader'>
        <h1> PLANS </h1> 
      </Col>
      </Row>
      <Row> 
        <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
          <p> Some default text about plans </p>
        </Col>
      </Row> 
      <Row>
        <Well className='profileActiveWell'>
          {plans.map((plan, i) => (
            <PlanEntry 
              key={i} 
              {...plan}
              onClick={()=>{editPlan(plan)}}
              genWorkouts={()=>{genWorkouts(plan, 'None')}} 
              genVolumeDeload={()=>{genWorkouts(plan, 'Volume')}}
              genWeightDeload={()=>{genWorkouts(plan, 'Weight')}}
            />
          ))}
        </Well>
      </Row>
    </Panel> 
  ) 
}
