import React, {Component} from 'react';

class New extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      pollName: "",
      flashes: []
    }

    // methods that need access this `this`
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.eachFlash = this.eachFlash.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);

  }

  handleChange(event) {
    // handle changing state of fields

    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({[name]: value})

  }

  _create() {
    return $.ajax({
      url: '/api/polls',
      type: 'POST',
      data: {
        name: this.state.pollName,
        options: this.state.pollOptions
      },
      beforeSend: function () {
        this.setState({loading: true});
      }.bind(this)
    })
  }

  _onSuccess(resp) {

    var newFlashes = this.state.flashes
    if (resp.success) {
      newFlashes.push({msg: resp.msg, success: true})
      this.setState({
        flashes : newFlashes
      })
    } else {
        // TODO: redirect to login
    }

  }

  _onError(error) {
    var newFlashes = this.state.flashes
    newFlashes.push({msg: resp.msg, success: false})
    this.setState({
      flashes : newFlashes
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A poll was submitted: ' + this.state.pollName);
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

    return(

      <div>
        <h1> Create a new poll </h1>
        <div className="flashes"> {this.state.flashes.map(this.eachFlash)} </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-2 col-form-label form-text">Poll Name</label>
            <div className="col-10">
              <input
                className="form-control"
                name="pollName"
                type="text"
                value={this.state.pollName}
                onChange={this.handleChange}
              />
            </div>
          </div>


          <div className="form-group row">
            <label className="form-text">Options (One choice per line)</label>
            <textarea
              className="form-control"
              rows="3"
              type="text"
              name="pollOptions"
              value={this.state.pollOptions}
              onChange={this.handleChange}
            >

            </textarea>
          </div>


          <input className="btn btn-info"  type="submit" value="Submit" />
        </form>
      </div>

    )
  }

}

export default New;
