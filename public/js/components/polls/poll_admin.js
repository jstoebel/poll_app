import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class PollAdmin extends Component {

    constructor(props){

      super(props);
      this.state = {
        polls: []
      }

      this.componentDidMount = this.componentDidMount.bind(this)
      this._getSuccess = this._getSuccess.bind(this)
      this.render = this.render.bind(this)
      this.eachPoll = this.eachPoll.bind(this)

      this.handleDestroy = this.handleDestroy.bind(this)
      this.handleShare = this.handleShare.bind(this)

      this._destroySuccess = this._destroySuccess.bind(this)

    }

    componentDidMount() {
      var _this = this;

          var xhr = $.ajax({
            url: '/api/polls/admin',
            type: 'GET'
          })

          xhr.done(this._getSuccess)
            .fail(this._getError)
    }

    _getSuccess(resp) {
      // successfully pulled the records
      console.log(resp);

      this.setState({
        polls: resp.polls
      })

    }

    _getError() {
      console.log("error fetching poll");
    }

    handleShare(event, id) {

      event.preventDefault();
      var path = location.protocol + '//' + location.host;
      var pollPath = path + "/poll/" + id;
      var tweet = "Checkout my new poll! " + pollPath;
      var href="https://twitter.com/home?status="+tweet;
      window.open(href);
    }

    handleDestroy(event, id) {

      event.preventDefault();
      console.log('A poll was asked to be removed: ' + id);

      var xhr = $.ajax({
        url: '/api/poll/destroy',
        type: 'DELETE',
        data: {
          _id: id
        }
      })
      xhr.done(this._destroySuccess)
        .fail(this._destroyError)
    }

    _destroySuccess() {
      // remove the poll from state and rerender

      console.log("destroy success");
      var xhr = $.ajax({
        url: '/api/polls/admin',
        type: 'GET'
      })
      console.log("got here");

      var _this = this;
      xhr.done(function(resp){
        console.log("callback!");
        _this.setState({
          polls: resp.polls
        })
      })
    }

    _destroyError() {
      console.log("destroy error");
    }



    eachPoll (poll, i) {

      return (
        <div className="row" key={poll._id}>
          <div className="col-xs-10">
            <Link to={"/poll/" + poll._id} >
              <div className="btn btn-info btn-block">
                {poll.name}
              </div>
            </Link>
          </div>

          <div className="col-xs-2">
            <div className="btn-group" role="group" aria-label="share and destroy">

              <div type="button" className="btn btn-info btn-secondary" onClick={(e) => this.handleShare(e, poll._id)} aria-label="share">
                <i className="fa fa-share" ></i>
              </div>

              <div className="btn btn-danger btn-secondary" onClick={(e) => this.handleDestroy(e, poll._id)} aria-label="destroy">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
          </div>

        </div>
      )
    }

    render() {
      return (
        <div>
        <h1> My Polls </h1>
          {this.state.polls.map(this.eachPoll)}
        </div>
      );
    }
}

export default PollAdmin;
