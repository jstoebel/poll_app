import React from 'react'
import * as d3 from 'd3'
import {LabeledArc} from './labled_arc'

class PieChart extends React.Component {


  /*
  required props
    x
    y
    outerRadius
    innerRadius
    data (example):
      [
        {value: 92, label: 'Code lines'},
        {value: 34, label: 'Empty lines'}
      ]
  */

  constructor() {
    super();

    this.pie = d3.layout.pie()
                 .value((d) => d.value);
    this.colors = d3.scale.category10();
  }

  getData() {

    var poll = this.props.data;
    var totalVotes = poll.options.reduce(function(total, option, i){
      return total += option.votes
    }, 0)

    var data = totalVotes > 0 ?
    poll.options :
    [ { name: "no votes yet"} ]

    return data;
  }

  arcGenerator(d, i) {

    return (
      <LabeledArc key={`arc-${i}`}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={this.colors(i)} />
    );
  }

  render() {

    let pie = this.pie(this.props.data),
      translate = `translate(${this.props.x}, ${this.props.y})`;

    return (
      <g transform={translate}>
          {pie.map((d, i) => this.arcGenerator(d, i))}
      </g>
    )
  }



}

export default PieChart;
