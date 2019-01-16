import React, { Component } from 'react';
import './Message.css';

// Luxon
import { DateTime } from "luxon";

class Message extends Component {

  // Converts miliseconds to a readable time and date
  getTime = (time) => {
    let timestamp = DateTime.fromSeconds(time.seconds)
    return timestamp.setLocale('nl').toFormat("H:mm -  dd-MM-yyyy")
  }

  render() {
    return (
      <div className="message-container">
        <div className="message-id">{this.props.id} - {this.getTime(this.props.time)}</div>
        <div className="message">{this.props.message}</div>
      </div>
    );
  }
}

export default Message;
