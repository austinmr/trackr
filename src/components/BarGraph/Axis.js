import React from 'react';
import * as d3 from "d3"

export default class Axis extends React.Component {
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis = () => {
    let node  = this.refs.axis;
    let { orient, y } = this.props; 
    if (orient === 'left') {
      d3.select(node).call(d3.axisLeft(y).ticks(4));
    }
  }

  render() {
    return <g className="axis" ref="axis"></g>
  }
}