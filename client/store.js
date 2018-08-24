import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE'; // get the input text from the UI and post it in db.
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
})

export const getMessagesFromServer = () => (
  async (dispatch) => {
    try {
      const { data } = await axios.get('/api/messages');
      dispatch(gotMessagesFromServer(data));
    } catch (err){
      console.error(err.stack);
    }
  }
)

export const writeMessage = inputText => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputText
})

export const gotMessageFromServer = (newMessage) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  newMessage
})

export const getMessageFromServer = (newMessageEntry) => (
  async (dispatch) => {
   try{
    const {data} = await axios.post('/api/messages', newMessageEntry);
    dispatch(gotMessageFromServer(data));
   } catch(err){
     console.error(err.stack);
   }
  }
)

const initialState = {
  messages: [],
  newMessageEntry: '', // inputText from the UI
}

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...prevState, messages: action.messages};
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...prevState, messages: [...prevState.messages, action.newMessage]};
    case WRITE_MESSAGE:
      return {...prevState, newMessageEntry: action.newMessageEntry}
    default:
      return prevState;
  }
}

const middlewares = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;
