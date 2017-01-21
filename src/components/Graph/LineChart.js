import React, { PropTypes } from 'react'
const Chart = require('react-d3-core').Chart;
const LineChart = require('react-d3-basic').LineChart;
import chartData from '../TestData'

class LineChartComponent extends React.Component {

  render() {
    const width = 700, height = 300, margins = {left: 100, right: 100, top: 50, bottom: 50}, title = "User sample"; 
    const chartSeries = [
      {
        field: 'BMI',
        name: 'BMI',
        color: '#ff7f0e'
      }
    ]
    const x = (d) => {
      return d.index;
    }

    return (
      <Chart
        title={title}
        width={width}
        height={height}
        margins={margins}
        >
        <LineChart
          showXGrid={false}
          showYGrid={false}
          margins={margins}
          title={title}
          data={chartData}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
        />
      </Chart>
    )
  }
}

export default LineChartComponent

