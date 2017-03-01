import React, {Component} from 'react';
import * as axios from 'axios'

class Index extends React.Component {

  getInitialState() {
    return {
      polls: []
    }
  }

  componentDidMount() {
    console.log("did mount");
    var _this = this;
    // this.serverRequest =
      axios
        .get("/polls")
        .then(function(result) {
          console.log("response:");
          console.log(result);
          console.log("^ response");
          _this.setState({
            polls: result.polls
          });
        })
        .catch(function(err){
          console.log(err);
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  eachPoll() {

    this.state.polls.forEach(function(poll){

      return(
        <div class="btn btn-info btn-block">
          {poll.name}
        </div>
      )
    })
  }

  render() {
    return(
      <div id="poll-index">
        here are the polls
      </div>
    )
  }

}

export default Index;
