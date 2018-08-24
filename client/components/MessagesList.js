import React, {Component} from 'react';
import {connect} from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import {getMessagesFromServer} from '../store';

class UnconnectedMessagesList extends Component {

  componentDidMount(){
    this.props.getMessages();
  }

  render(){
    const props = this.props;
    const channelId = Number(props.match.params.channelId); // because it's a string "1", not a number!

    const messages = props.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);
    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: () => dispatch(getMessagesFromServer())
});

const MessagesList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMessagesList);
export default MessagesList;



