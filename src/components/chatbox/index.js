import React, { Component } from 'react';
import './ChatBox.css';

// Material-UI
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';

class ChatBox extends Component {

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.submitMessage()
    }
  }

  render() {
    return (
      <TextField
        fullWidth
        id="message-input"
        label="Message"
        value={this.props.message}
        type={'text'}
        onChange={this.props.handleChange('message')}
        margin="normal"
        variant="outlined"
        onKeyPress={this.handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={e => {
                  e.preventDefault()
                  this.props.submitMessage()
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default ChatBox;
