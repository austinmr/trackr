import React from 'react'

class Rect extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.height, this.props.y, this.props.width); 
  }

  render() {
    const { height, width, x, y } = this.props; 
    return (
      <rect 
        className="bar"
        height={height} 
        width={width}
        x={x}
        y={y}
        rx={4}
        ry={4}> 
      </rect>
    );
  }
};

export default Rect