import React from 'react'
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import AvatarImg from '../../../assets/Avatar-Male.png' 

export default ({ username, workouts, templates, plans, height, weight }) => {

  return (
    <div>
      <Row className='userImgContainer'>
        <img src={AvatarImg} alt="user profile" width={250} height={250} style={{borderRadius: 10, marginTop: 15}} />
      </Row>
      <Row className='userData'>
        <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
          <h3> {username.toUpperCase()} </h3>
        </Col>
        <Col xs={5} md={5} xsOffset={1} mdOffset={1} className='userData'>
          <h2> H | </h2> <h3>{`5'11"`} </h3>
        </Col> 
        <Col xs={6} md={6} className='userData'>
          <h2> W | </h2><h3>{`185 lbs`} </h3>
        </Col> 
        <Col xs={6} md={6} xsOffset={1} mdOffset={1} className='userData'>
          <h2> WORKOUTS</h2>
        </Col> 
        <Col xs={1} md={1} className='userData'>
          <h2>|</h2>
        </Col>
        <Col xs={4} md={4} className='userData'>
          <h3>{`${workouts}`} </h3>
        </Col>
        <Col xs={6} md={6} xsOffset={1} mdOffset={1} className='userData'>
          <h2> TEMPLATES </h2>
        </Col> 
        <Col xs={1} md={1} className='userData'>
          <h2>|</h2>
        </Col>
        <Col xs={4} md={4} className='userData'>
          <h3>{`${templates}`} </h3>
        </Col>
        <Col xs={6} md={6} xsOffset={1} mdOffset={1} className='userData'>
          <h2>PROGRAMS</h2>
        </Col> 
        <Col xs={1} md={1} className='userData'>
          <h2>|</h2>
        </Col>
        <Col xs={4} md={4} className='userData'>
          <h3>{`${plans}`} </h3>
        </Col>
      </Row>
    </div>
  )
}

// <Col xs={7} md={7} xsOffset={1} mdOffset={1}>
//   <h2> WORKOUTS </h2>
// </Col> 
// <Col xs={4} md={4}>
//   <h3>{`${workouts}`} </h3>
// </Col>
// <Col xs={7} md={7} xsOffset={1} mdOffset={1}>
//   <h2> TEMPLATES </h2>
// </Col> 
// <Col xs={4} md={4}>
//   <h3>{`${templates}`} </h3>
// </Col>
// <Col xs={7} md={7} xsOffset={1} mdOffset={1}>
//   <h2> PLANS </h2>
// </Col> 
// <Col xs={4} md={4}>
//   <h3>{`${plans}`} </h3>
// </Col>
// <Col xs={5} md={5} xsOffset={1} mdOffset={1}>
//   <h2> HEIGHT </h2>
// </Col> 
// <Col xs={5} md={5}>
//   <h3>{`5'11"`} </h3>
// </Col>
// <Col xs={5} md={5} xsOffset={1} mdOffset={1}>
//   <h2> WEIGHT </h2>
// </Col> 
// <Col xs={5} md={5}>
//   <h3>{`185 lbs`} </h3>
// </Col>