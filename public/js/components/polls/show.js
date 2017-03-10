import React from 'react'
import * as d3 from 'd3'
import d3Legend from 'd3-legend'
import {event as currentEvent} from 'd3';
import Faux from 'react-faux-dom'
import Dimensions from 'react-dimensions'

d3Legend(d3)
console.log(d3.legend)

const Show = React.createClass({
  mixins: [
    Faux.mixins.core,
    Faux.mixins.anim
  ],

  getInitialState () {
    return {
      chart: "loading...",
      pollOption: "",
      poll: { options: []},  // mock this object until the real one is loaded in
      tooltip: {
        x: 0,
        y: 0
      }
    }
  },

  componentWillMount() {

  },

  _getRecord() {
    return $.ajax({
      url: '/api/polls/' + this.props.params.pollId,
      type: 'GET'
    })
  },

  _getSuccess(resp) {

    console.log("starting _getSuccess")
    this.setupPie(resp);
    this.setState({
      poll: resp
    })
  },

  _getError(error) {
    console.log("error fetching record");
  },

  _submitRecord() {
    return $.ajax({
      url: '/api/polls/vote',
      type: 'POST',
      data: {
        pollId: this.state.poll._id,
        optionId: this.state.pollOption
      }
    })
  },

  _submitSuccess(resp) {
    console.log("submit success!")
    console.log(resp);
  },

  _submitError(error) {
    console.log("submit error!")
    console.log(error);
  },

  componentDidMount () {
    var xhr = this._getRecord();
    // xhr.done(this._getSuccess)
    xhr.done(this._getSuccess)
      .fail(this._getError)

  },

  handleChange(event) {
    // handle changing state of fields

    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({[name]: value})

  },

  handleSubmit(event) {
    event.preventDefault();
    console.log('A poll was voted on: ' + this.state.pollOption);

    var xhr = this._submitRecord();
    xhr.done(this._submitSuccess)
      .fail(this._submitError)
  },

  setupPie(poll) {
    // resp: the http response from the server
    // sets up the pie chart and loads it into state
    console.log(poll);


    const faux = this.connectFauxDOM('div.renderedD3', 'chart')

    var totalVotes = poll.options.reduce(function(total, option, i){
      return total += option.votes
    }, 0)

    // only try to draw a pie chart if there are any votes
    var width = 0.4 * this.props.containerWidth,
      height = width,
      radius = 0.5 * width,
      colors = d3.scale.category20c();

    // generate data to render, either from record or in the case of no votes
    // mock up some stand in data
    var pieData = totalVotes > 0 ?
      poll.options :
      [
        {
          name: "no votes yet",
        }
      ]

    console.log(pieData)

    var pie = d3.layout.pie()
    .value(function(d) {
      return d.votes;
    })

    var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(.7 * radius)

    var myChart = d3.select(faux).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr()
      .append('g')
      .attr('transform', 'translate('+(width-radius)+','+(height-radius)+')')
      .selectAll('path').data(pie(pieData))
      .enter().append('g')
        .attr('class', 'slice')

    var slices = d3.select(faux).selectAll('g.slice')
      .append('path')
      .attr('fill', function(d, i) {
        return colors(i);
      })
      .attr('d', arc)

    var text = d3.select(faux).selectAll('g.slice')
    .append('text')
    .text(function(d, i) {
      if (d.data.votes / totalVotes < .05 || d.data.votes == 0) {
        // don't show label if no votes or under 5%
        return ""
      } else {
        return d.data.name;
      }
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('transform', function(d) {
      d.innerRadius = 0;
      d.outerRadius = radius;
      return 'translate('+ arc.centroid(d)+')'
    })

  },

  eachOption(option, i) {
    return (
      <option value={option._id} key={i}> {option.name} </option>

    )
  },

  // setupSubmitBtn(){
  //   // renders the submit button as eithe
  // }

  setupMenu(){

    if ( this.state.poll ) {
      return (
        <form onSubmit={this.handleSubmit} >
          <div className="form-horizontal">

            <select
              className="selectpicker col-sm-12"
              name="pollOption"
              value={this.state.pollOption}
              onChange={this.handleChange}
            >
            <option selected className="text-center">Vote in this poll</option>
              {this.state.poll.options.map(this.eachOption)}
            </select>
          </div>

          <input
            className={"btn btn-info" + this.state.pollOption ? "" : "disabled"}
            type="submit" value="Submit" />
        </form>
      )
    } else {
      return (


        <form >
          <div className="form-horizontal">
            <select
              className="custom-select"
              name="pollOption"
            >
              <option selected className="text-center">Loading...</option>
            </select>
          </div>

          <input className="btn btn-info disabled"  type="submit" value="Submit" />
        </form>

      )
    }

  },

  render () {
    return (
      <div>
        <h2 className="text-center">Here is some fancy data:</h2>
        <div className="container-fluid">
          <div className="row">
            <div className='renderedD3 col-xs-12 col-md-6'>
              {this.state.chart}
            </div>

            <div className="col-xs-12 col-md-6" id="show-menu">
              {this.setupMenu()}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Dimensions()(Show) // renders component inside a an element with known width and height
