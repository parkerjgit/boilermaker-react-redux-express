import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
})

export const getMessagesFromServer = () => (
  async (dispatch) => {
    const { data } = await axios.get('/api/messages');
    dispatch(gotMessagesFromServer(data));
  }
)

const initialState = {
  messages: [],
}

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...prevState, messages: action.messages};
    default:
      return prevState;
  }
}

const middlewares = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;
