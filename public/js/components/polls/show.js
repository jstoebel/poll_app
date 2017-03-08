import React from 'react'
import * as d3 from 'd3'
import Faux from 'react-faux-dom'

const Show = React.createClass({
  mixins: [
    Faux.mixins.core,
    Faux.mixins.anim
  ],

  getInitialState () {
    console.log("get initial state")
    return {
      chart: 'loading...'
    }
  },

  componentWillMount() {
    // // fetch record from /api/polls/:pollId

    console.log("componentWillMount")
    // var xhr = this._getRecord();
    // // xhr.done(this._getSuccess)
    // xhr.done(this._getSuccess)
    //   .fail(this._getError)
  },

  _getRecord() {
    return $.ajax({
      url: '/api/polls/' + this.props.params.pollId,
      type: 'GET'
    })
  },

  // _getSuccess(resp) {
  //
  //   console.log(resp);
  //   this.setState({
  //     poll: resp
  //   })
  // },

  _getError(error) {
    console.log("error fetching record");
  },

  componentDidMount () {

    var xhr = this._getRecord();
    // xhr.done(this._getSuccess)
    xhr.done(this.setupPie)
      .fail(this._getError)

  },

  setupPie(poll) {
    // resp: the http response from the server
    // sets up the pie chart and loads it into state

    console.log("setupPie!")
    const faux = this.connectFauxDOM('div.renderedD3', 'chart')


    var width = 400,
        height = 400,
        radius = 200,
        colors = d3.scale.category20c();

    var piedata = [
        {
            label: "Barot",
            value: 10
        },{
            label: "Gerard",
            value: 10
        },{
            label: "Jennifer",
            value: 50
        }
    ]

    var pie = d3.layout.pie()
        .value(function(d) {
            return d.value;
        })

    var arc = d3.svg.arc()
        .outerRadius(radius)

    var myChart = d3.select(faux).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate('+(width-radius)+','+(height-radius)+')')
        .selectAll('path').data(pie(piedata))
        .enter().append('path')
            .attr('fill', function(d, i) {
                return colors(i);
            })
            .attr('d', arc)

  },

  renderLoading(){

  },

  render () {

    console.log("render!")
    console.log(this.state)
    return (
      <div>
        <h2>Here is some fancy data:</h2>
        <div className='renderedD3'>
          {this.state.chart}
        </div>
      </div>
    )
  }
})

export default Show
