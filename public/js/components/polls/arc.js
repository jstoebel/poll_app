
import React, {Component} from 'react';
import d3 from 'd3';

class Arc extends Component {
  /*
  A single arc in a pie chart
  expected props:
  data: example: {value: 92, label: 'some option'}
  */
    constructor() {
        super();
        this.arc = d3.svg.arc();
    }

    componentWillMount() {
        this.updateD3(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }

    updateD3(newProps) {
      this.arc.innerRadius(newProps.innerRadius);
      this.arc.outerRadius(newProps.outerRadius);
    }

    render() {
      return (
        <path d={this.arc(this.props.data)}
           style={{fill: this.props.color}}>
         </path>
      );
    }
}

export default Arc;
