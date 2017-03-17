import React from 'react';
import * as d3 from 'd3';
// import {event as currentEvent} from 'd3-selection';
import {event as currentEvent} from 'd3';
import Faux from 'react-faux-dom';
import Dimensions from 'react-dimensions';

import Pie from "./pie";
import Tooltip from "./tooltip";


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

    // this.setupPie(resp);
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

  eachOption(option, i) {
    return (
      <option value={option._id} key={i}> {option.name} </option>

    )
  },

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
    var width = 0.4 * this.props.containerWidth,
      height = width,
      radius = 0.5 * width
    return (
      <div>
        <h2 className="text-center">Here is some fancy data:</h2>
        <div className="container-fluid">
          <div className="row">
            <div className='renderedD3 col-xs-12 col-md-6'>
              <svg height={height} width={width}>
                <Pie
                  data={this.state.poll}
                  width={width}
                  height={height}
                  radius={radius}
                />
                <Tooltip />
              </svg>
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
