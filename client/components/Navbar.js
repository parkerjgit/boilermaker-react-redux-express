import React, { Component } from 'react';
import {connect} from 'react-redux';
import NameEntry from './NameEntry';

class Navbar extends Component {

  render () {
    return (
      <nav>
        <h3>{this.props.channelName}</h3>
        <NameEntry />
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  channelName: state.currentChannel
});

export default connect(mapStateToProps)(Navbar);
