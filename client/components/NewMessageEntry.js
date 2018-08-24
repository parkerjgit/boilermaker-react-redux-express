import React, { Component } from 'react';
import {connect} from 'react-redux';
import {writeMessage, postMessageToServer} from '../store';

class UnconnectedNewMessageEntry extends Component {

  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const write = this.props.write;
    const inputText = event.target.value;
    write(inputText);
  }

  handleSubmit(event){
    event.preventDefault();

    const channelId = this.props.channelId;
    const content = this.props.newMessageEntry;
    const message = {
      channelId, content
    };

    this.props.submit(message);
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            onChange={this.handleChange}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.props.newMessageEntry}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  newMessageEntry: state.newMessageEntry
});

const mapDispatchToProps = (dispatch) => ({
  write: (str) => dispatch(writeMessage(str)),
  submit: (message) => dispatch(postMessageToServer(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedNewMessageEntry);

