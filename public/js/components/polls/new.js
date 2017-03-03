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
  }

  sendFormData() {


  }

  handleChange(event) {
    // handle changing state of fields
    this.setState({pollName: event.target.value});
  }

  _create() {
    return $.ajax({
      url: '/api/polls',
      type: 'POST',
      data: {
        name: this.state.pollName
      },
      beforeSend: function () {
        this.setState({loading: true});
      }.bind(this)
    })
  }

  _onSuccess(resp) {

    this.setState({
      flashes: [
        {flash: resp.msg, success: true}
      ]
    })
    console.log(state.flashes);
  }

  _onError(error) {
    console.log(error);
    this.setState({
      flashes: [
        {flash: resp.msg, success: false}
      ]
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
    <div class="alert alert-{flash.ok ? 'success' : 'danger'} alert-dismissable">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      {flash.msg}
    </div>
  }

  render() {
    return(

      <div>
        {this.state.flashes.map(this.eachFlash)}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-2 col-form-label">Poll Name</label>
            <div className="col-10">
              <input className="form-control" name="pollName"  type="text" value={this.state.pollName} onChange={this.handleChange} />
            </div>
          </div>

          <input className="btn btn-info"  type="submit" value="Submit" />
        </form>
      </div>

    )
  }

}

export default New;
