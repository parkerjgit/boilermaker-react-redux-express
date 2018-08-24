import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE'; // get the input text from the UI and post it in db.
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const ADD_AUTHOR_NAME = 'ADD_AUTHOR_NAME';
const GET_CURRENT_CHANNEL_NAME = 'GET_CURRENT_CHANNEL_NAME';

export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const getMessagesFromServer = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/messages');
    dispatch(gotMessagesFromServer(data));
  } catch (err) {
    console.error(err.stack);
  }
};

export const writeMessage = inputText => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputText,
});

export const gotMessageFromServer = newMessage => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  newMessage,
});

export const postMessageToServer = message => async dispatch => {
  try {
    const { data } = await axios.post('/api/messages', message);
    dispatch(gotMessageFromServer(data));

    socket.emit('new-message', data);
  } catch (err) {
    console.error(err.stack);
  }
};

export const addAuthorName = name => ({
  type: ADD_AUTHOR_NAME,
  name,
});

export const changeCurrentChannelName = channelName => ({
  type: GET_CURRENT_CHANNEL_NAME,
  channelName
})

const initialState = {
  messages: [],
  newMessageEntry: '', // inputText from the UI
  authorName: '',
  currentChannel: '# really_random'
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...prevState, messages: action.messages };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {
        ...prevState,
        messages: [...prevState.messages, action.newMessage],
      };
    case WRITE_MESSAGE:
      return { ...prevState, newMessageEntry: action.newMessageEntry };
    case ADD_AUTHOR_NAME:
      return {...prevState, authorName: action.name};
    case GET_CURRENT_CHANNEL_NAME:
      return {...prevState, currentChannel: action.channelName};
    default:
      return prevState;
  }
};

const middlewares = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;
