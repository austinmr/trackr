import React from 'react'
import * as d3 from 'd3'

export default class Gridline extends React.Component {
  componentDidUpdate() {
    this.renderGridLines();
  }

  componentDidMount() {
    this.renderGridLines();
  }

  renderGridLines = () => {
    let node  = this.refs.gridlines;
    let { gridlines, makeGridlines, width, height } = this.props; 
    if (gridlines === 'x') {
      d3.select(node)
        .call(makeGridlines().tickSize(-height).tickFormat(""));
    } else if (gridlines === 'y') {
      d3.select(node)
        .call(makeGridlines().tickSize(-width).tickFormat(""));
    }
  }

  render() {
    return <g className="gridlines" ref="gridlines" transform={this.props.translate}></g>
  }
}