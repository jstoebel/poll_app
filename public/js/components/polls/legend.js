import React from 'react'
import * as d3 from 'd3'

class Legend extends React.Component {

  //expected props
    // poll: the poll item
    // colors: the colors function bound to Show component

  constructor() {
    super();
    this.eachOption = this.eachOption.bind(this);
  }

  eachOption(option, i){
    return(
      <li key={i}>
        <span style={
          {
            backgroundColor: this.props.colors(i),
            height: '20px',
            width: '20px'
          }

        }/>
        {option.name}
      </li>
    )
  }

  render() {
    return(
      <ul>
        {this.props.poll.options.map(this.eachOption)}
      </ul>

    )
  }

}

export default Legend;
