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
    let { orient, x, y, width, dates } = this.props; 
    if (orient === 'bottom') {
      d3.select(node).call(d3.axisBottom(x).tickValues(dates).tickFormat(d3.timeFormat("%b %d")).ticks(dates.length));
    } else if (orient === 'left') {
      d3.select(node).call(d3.axisLeft(y).ticks(4));
      // d3.select(node).call(d3.axisLeft(y));
    }
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}