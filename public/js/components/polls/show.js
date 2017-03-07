import React, {Component} from 'react';

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

  }

  componentWillMount() {
    console.log("will mount");
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

    console.log("get success");
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

  eachFlash(flash, i) {

    return (
      <div
        className={"alert alert-" + (flash.success ? 'success' : 'danger') + " alert-dismissable" }
        key={i}
      >
          <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
          {flash.msg}
      </div>

    )
  }

  render() {
    console.log("render show!");
    return(

      <div>
        <h1> {this.state ? this.state.poll.name : "loading..."} </h1>

      </div>

    )
  }

}

export default Show;
