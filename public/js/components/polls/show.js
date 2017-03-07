import React, {Component} from 'react';
import * as d3 from "d3";
import Faux from 'react-faux-dom';

class Show extends React.Component {

  constructor(props){
    super(props);

    // methods that need access this `this`
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._getSuccess = this._getSuccess.bind(this);
    this._getError = this._getError.bind(this);

    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);

    this.renderPoll = this.renderPoll.bind(this);
    this.renderLoading = this.renderLoading.bind(this);

    this.state = {poll: ""}

  }

  componentWillMount() {
    // // fetch record from /api/polls/:pollId
    var xhr = this._getRecord();
    // xhr.done(this._getSuccess)
    xhr.done(this._getSuccess)
      .fail(this._getError)
  }

  _getRecord() {
    return $.ajax({
      url: '/api/polls/' + this.props.params.pollId,
      type: 'GET'
    })
  }

  _getSuccess(resp) {

    console.log(resp);
    this.setState({
      poll: resp
    })
  }

  _getError(error) {
    console.log("error fetching record");
  }

  handleChange(event) {
    // handle changing state of fields

    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({[name]: value})

  }

  _create() {
    // submit vote
    // return $.ajax({
    //   url: '/api/polls',
    //   type: 'POST',
    //   data: {
    //     name: this.state.pollName,
    //     options: this.state.pollOptions
    //   },
    //   beforeSend: function () {
    //     this.setState({loading: true});
    //   }.bind(this)
    // })
  }

  _onSuccess(resp) {


  }

  _onError(error) {

  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = {
      pollName: this.state.pollName
    }

    var xhr = this._create();
    xhr.done(this._onSuccess)
      .fail(this._onError)
  }

  pollSummary(option, i) {

    return (
      <li
        key={i}
      >
          {option.name + " : " + option.votes}
      </li>

    )
  }

  eachOption(option, i) {
    return (
      <option value={option._id} key={i}> {option.name} </option>

    )
  }

  renderChart(){

    var container = d3.select("#pie-container")
    console.log(container);
    console.log(container.node().getBoundingClientRect());

    var list = Faux.createElement('ul')

    // var width = 960,
    // height = 500,
    // radius = Math.min(width, height) / 2;
    //
    // var color = d3.scale.category20();
    //
    // var pie = d3.layout.pie()
    //     .value(function(d) { return d.apples; })
    //     .sort(null);
    //
    // var arc = d3.svg.arc()
    //     .innerRadius(radius - 100)
    //     .outerRadius(radius - 20);
    //
    // var svg = d3.select("body").append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //   .append("g")
    //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    //
    // d3.tsv("data.tsv", type, function(error, data) {
    //   if (error) throw error;
    //
    //   var path = svg.datum(data).selectAll("path")
    //       .data(pie)
    //     .enter().append("path")
    //       .attr("fill", function(d, i) { return color(i); })
    //       .attr("d", arc)
    //       .each(function(d) { this._current = d; }); // store the initial angles
    //
    //   d3.selectAll("input")
    //       .on("change", change);
    //
    //   var timeout = setTimeout(function() {
    //     d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
    //   }, 2000);
    //
    //   function change() {
    //     var value = this.value;
    //     clearTimeout(timeout);
    //     pie.value(function(d) { return d[value]; }); // change the value function
    //     path = path.data(pie); // compute the new angles
    //     path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    //   }
    // });
    //
    // function type(d) {
    //   d.apples = +d.apples;
    //   d.oranges = +d.oranges;
    //   return d;
    // }

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    // function arcTween(a) {
    //   var i = d3.interpolate(this._current, a);
    //   this._current = i(0);
    //   return function(t) {
    //     return arc(i(t));
    //   };
  }

  renderPoll() {
    return (
      <div className="container">
        <h1> {this.state.poll ? this.state.poll.name : "loading..."} </h1>
        <div className="row">

          <div className="col-xs-12 col-md-6" id="pie-container">
            {this.renderChart()}
          </div>

          <div className="col-xs-12 col-md-6" id="show-menu">
            <select
              className="custom-select"
              name="pollOption"
              value={this.state.pollOption}
              onChange={this.handleChange}
            >
              <option selected>Vote in this poll</option>
              {this.state.poll.options.map(this.eachOption)}
            </select>

          </div>

        </div>

      </div>
    )
  }

  renderLoading() {
    return (
      <div> Loading... </div>
    )
  }

  render() {

    return (
      <div>
        {this.state.poll ? this.renderPoll() : this.renderLoading()}
      </div>
    )
  }

}

export default Show;
