import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAuthorName } from '../store';

class NameEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.value;
    this.props.addAuthorName(name);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Your name:</label>
        <input
          onChange={this.handleChange}
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          value={this.props.name}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  name: state.authorName,
})

const mapDispatchToProps = dispatch => ({
  addAuthorName: name => dispatch(addAuthorName(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(NameEntry);
