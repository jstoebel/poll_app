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

  eachOption(name, i){
    return(
      <li key={i} style={
        {
          color: this.props.colors(i),
          // display: "inline-block",
          whiteSpace: "nowrap"
        }

      }
      className="legendItem"
      >
        <i className="fa-li fa fa-circle"></i>
        {name}
      </li>
    )
  }

  render() {
    console.log(this.props.data);
    var names = this.props.data.map(function(item){
      return item.label;
    })
    console.log(names);

    return(
      <div>
        <ul className="fa-ul legend">
          {names.map(this.eachOption)}
        </ul>

      </div>

    )
  }

}

export default Legend;
