import React, { Component } from 'react';
import { Link } from 'react-router';

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

    }

    componentDidMount() {
      var _this = this;

        // axios('/api/polls/admin')
        //   .then(function(result){
        //     _this.setState({
        //       polls: result.data.polls
        //     })
        //   })
        //   .catch(function(err){
        //     console.log("error fetching records")
        //   })

          var xhr = $.ajax({
            url: '/api/polls/admin',
            type: 'GET'
          })

          xhr.done(this._getSuccess)
            .fail(this._getError)
    }

    _getSuccess(resp) {
      // successfully pulled the record

      this.setState({
        polls: resp.polls
      })

    }

    _getError() {
      console.log("error fetching poll");
    }

    handleDestroy() {

      event.preventDefault();

      const target = event.target;
      console.log(target);
      // const value = target.value;
      // const name = target.name;

      console.log('A poll was asked to be removed: ' + this.state.pollName);

    }

    _destroySuccess() {
      // remove the poll from state and rerender
    }

    _destroyError() {

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
            
          </div>

          <div className="col-xs-6 col-md-2">
            <div className="btn btn-info btn-block">
              Delete
            </div>
          </div>

          <div className="col-xs-6 col-md-2">
            <form  onSubmit={this.handleDestroy}>
              <input type="hidden" name="pollId" value={poll._id} />
              <input className="btn btn-info btn-block"  type="submit" value="Submit" />
            </form>
          </div>

        </div>
      )
    }

    render() {
      return (
        <div>
          {this.state.polls.map(this.eachPoll)}
        </div>
      );
    }
}

export default PollAdmin;
