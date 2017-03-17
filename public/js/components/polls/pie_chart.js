import React from 'react'
import * as d3 from 'd3'

class pieChart extends React.Component {

  componentDidUpdate() {
    console.log("Pie: did upate")
    this.renderSlices();
  }

  componentDidMount() {
    console.log("Pie: did mount")
    this.renderSlices();
  }
  // render () {
  //   return (<div> hello from pie. my poll is: {this.props.data.name} </div>)
  // }

  renderSlices () {
    console.log("Pie: renderSlices");
    var pieData = this.getData();
    var node = this.refs.outerG;
    console.log(node);
    var d3Node = d3.select(node).append('span')
    // console.log(node)
    // console.log(d3.select(node).selectAll('path'))
    // console.log(    d3.select(node).selectAll('path').data(pie(pieData))
    //       .enter().append('g')
    //       .attr('class', 'slice'))
    // d3.select(node).selectAll('path').data(pie(pieData))
    //   .enter().append('g')
    //   .attr('class', 'slice')

  }

  render () {

    // props: width, height, radius
    console.log("Pie: render")
    const translate = `translate(${this.props.width-this.props.radius}, ${this.props.height-this.props.radius})`

    return (

      <g transform={translate} ref="outerG" >
      </g>

    )

  }

}

export default Pie;
