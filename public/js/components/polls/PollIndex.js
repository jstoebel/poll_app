import React, {Component} from 'react';


class App extends React.Component {

  // getInitialState() {
  //   return {
  //     polls: []
  //   }
  // }
  //
  // componentDidMount() {
  // var _this = this;
  // this.serverRequest =
  //   axios
  //     .get("/polls")
  //     .then(function(result) {
  //       _this.setState({
  //         polls: result.polls
  //       });
  //     })
  // }
  //
  // componentWillUnmount() {
  //   this.serverRequest.abort();
  // }
  //
  // eachPoll() {
  //
  //   this.state.polls.forEach(function(poll){
  //
  //     return(
  //       <div class="btn btn-info btn-block">
  //         {poll.name}
  //       </div>
  //     )
  //   })
  // }

  render() {
    return(
      <div id="poll-index">
        here are the polls
      </div>
    )
  }

}

export default App;
