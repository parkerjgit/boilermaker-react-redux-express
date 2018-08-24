import io from 'socket.io-client';
import store, {gotMessageFromServer} from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', (message) => {
    console.log("getting a new message " + message);
    store.dispatch(gotMessageFromServer(message))
  })

});



export default socket;
