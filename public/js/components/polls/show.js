import React from 'react';
import * as d3 from 'd3';
import Dimensions from 'react-dimensions';
import $ from 'jquery';

import PieChart from "./pie_chart";

const Show = React.createClass({

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
    console.log("get success");
    var poll = resp;
    if (poll) {
      var totalVotes = poll.options.reduce(function(total, option, i){
        return total += option.votes
      }, 0)

      if (totalVotes === 0) {
        // no votes
        var newData = [{value: 0, label: 'no votes yet'}];
      } else {
          // more than one vote, generate the object. options with no votes should
          // not be labeled.

          var newData = poll.options.map(function(option, i){
            if (option.votes > 0) {
              return {value: option.votes, label: `${option.name}: ${option.votes}`}
            } else {
              // option has no votes. Don't lebel it.
              return {value: option.votes, label: ""}
            }
          })
      }


    } else {
      var newData = [];
    }

    this.setState({
      poll: poll,
      pieData: newData
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

  eachOption(option, i) {
    return (
      <option value={option._id} key={i}> {option.name} </option>

    )
  },

  renderMenu(){

    if ( this.state.poll ) {

      return (
        <div>
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

        </div>
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

  renderPie(height, width, radius) {
    if (this.state.pieData) {
      return (
        <svg height={height} width={width}>
          <PieChart
            x={width/2} y={height/2} outerRadius={radius} innerRadius={radius/2}
            data={this.state.pieData}
          />
        </svg>
      )
    } else {
      return (<div> Loading... </div>)
    }
  },

  render () {
    var width = 0.4 * this.props.containerWidth,
      height = width,
      radius = 0.5 * width
    return (
      <div>
        <h2 className="text-center">{this.state.poll.name}</h2>
        <div className="container-fluid">
          <div className="row">
            <div className='renderedD3 col-xs-12 col-md-6'>
                {this.renderPie(height, width, radius)}
            </div>

            <div className="col-xs-12 col-md-6" id="show-menu">
              {this.renderMenu()}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Dimensions()(Show) // renders component inside a an element with known width and height
