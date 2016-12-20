import React from 'react'
import Label from './Label'
import { Popover, OverlayTrigger } from 'react-bootstrap';

class StyledRect extends React.Component {
  state = {
    labelHeight: 600,
    fill: "gray"
  }



  // componentWillMount() {
  //   console.log(this.props.height, this.props.y, this.props.width); 
  // }

  handleEntering = () => {
    console.log('Entering!'); 
    this.setState({
      labelHeight: 350,
      fill: "aqua"
    }); 
  }

  handleExiting = () => {
    console.log('Exiting!'); 
    this.setState({
      labelHeight: 600,
      fill: "gray"
    }); 
  }

  render() {
    const { height, width, x, y, xLabel, reps, weight, oneRepMax } = this.props; 
    const { labelHeight, fill } = this.state; 
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={`${weight} lbs || ${reps} reps`}>
        <strong>One Rep Max:</strong> {`${oneRepMax}`}
      </Popover>
    )

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus} onEntering={this.handleEntering} onExiting={this.handleExiting}>
      <g>
        <rect 
          className="bar"
          height={height} 
          width={width}
          x={x}
          y={y}
          rx={4}
          ry={4}
        > 
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

export default StyledRect