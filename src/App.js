import React, { Component } from 'react';
import './App.css';

// components
import Message from './components/message';
import ChatBox from './components/chatbox';

// Firebase
import firebase from './firebase.js';

// Random word generator
import randomWords from 'random-words';

// Material-UI
import LinearProgress from '@material-ui/core/LinearProgress';

// Cloud Firestore
const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

class App extends Component {
  constructor(props){
    super(props);
    this.ref = db.collection('chat').orderBy('timestamp', 'desc');
    this.unsubscribe = null;
    this.state = {
      id: null,
      chat: [],
      message: ''
    };
  }

  // When the react app is loaded, this function fires which unsures that
  // we unsubscribe when the react app is closed
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.setState({
      id: this.generateUsername()
    })
  }

  // Generates a random ID with three words with the spaces removed
  generateUsername = () => {
    let id = randomWords({ exactly: 3, join: ' ' });
    id = id.replace(/\s+/g, '');
    return id;
  }

  // This function is fired when the database is updated
  onCollectionUpdate = (querySnapshot) => {
    const chat = [];
    querySnapshot.forEach((doc) => {
      const { id, msg, timestamp } = doc.data();
      chat.push({
        key: doc.id,
        id,
        msg,
        timestamp,
      });
    });
    this.setState({
      chat
   });
  }

  // This function changes the message in the state
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // Submits the message to Cloud Firestore and resets the message in the state
  submitMessage = () => {
    db.collection('chat').add({
      id: this.state.id,
      msg: this.state.message,
      timestamp: new Date()
    }).then(() => {
      console.log(`Message successfull send`)
      this.setState({
        message: ''
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <span className="header-title">Firebase Chat</span>
          <span className="header-id">ID: {this.state.id}</span>
        </header>
        <div className="chat-container">
          {this.state.chat.map(message =>
            <Message
              key={message.key}
              id={message.id}
              message={message.msg}
              time={message.timestamp}
            />
          )}
        </div>
        <div className="input-container">
          <ChatBox
            message={this.state.message}
            handleChange={this.handleChange}
            submitMessage={this.submitMessage}
          />
        </div>
      </div>
    );
  }
}

export default App;
