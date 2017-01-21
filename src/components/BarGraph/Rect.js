import React from 'react'
import Label from './Label'
import { Popover, OverlayTrigger } from 'react-bootstrap';

class Rect extends React.Component {
  state = {
    labelHeight: 400,
    fill: 'rgba(250, 250, 250, 0.9)',
    stroke: 'rgba(250, 250, 250, 0.9)',
    selected: 'unselected'
  }

  handleEntering = () => {
    const { yValue } = this.props;
    let labelHeight = yValue + 100; 

    this.setState({
      labelHeight: labelHeight,
      fill: "#4adda5",
      stroke: "#4adda5",
      selected: 'selected'
    }); 
  }

  handleExiting = () => {
    this.setState({
      labelHeight: 400,
      fill: "rgba(250, 250, 250, 0.9)",
      stroke: "rgba(250, 250, 250, 0.9)",
      selected: 'unselected'
    }); 
  }

  render() {
    const { height, width, xValue, yValue, xLabel, reps, weight, oneRepMax } = this.props; 
    const { labelHeight, fill, stroke, selected } = this.state; 
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={`${weight} lbs || ${reps} reps`}>
        <strong>One Rep Max:</strong> {`${oneRepMax}`}
      </Popover>
    )

    return (
      <OverlayTrigger 
        placement="top" 
        trigger={['hover', 'focus']} 
        overlay={popoverHoverFocus} 
        onEntering={this.handleEntering} 
        onExiting={this.handleExiting}>
      <g>
        <rect 
          className={`bar ${selected}`}
          height={height} 
          width={width}
          x={xValue}
          y={yValue}
          stroke={stroke}
          rx={4}
          ry={4}>
        </rect>
        <Label
          x={xLabel}
          y={labelHeight}
          fill={fill}
          reps={reps}
          weight={weight}
          oneRepMax={oneRepMax}
        />
      </g>
      </OverlayTrigger>
    );
  }
};

export default Rect