import React, { Component } from 'react';
import logo from './logo.png';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import ajax from 'superagent';
import './App.css';
import MessageList from './MessageList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { jennyState: 'initial', chatValue: '', messages: [], showTyping: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const message = this.state.chatValue;
      const self = this;

      this.emptyChatMessage();
      this.addMessage(message, 'user', 'You');
      self.setState({ showTyping: true });
      setTimeout(function () {
        self.setState({ showTyping: false });
        ajax
        .post('/get_next_response')
        .send({conversation_id: '1234', user_input: {text: message} })
        .withCredentials()
        .set('Accept', 'application/json')
        .end(function (err, res) {
          if (err) {
            self.handleJennyResponse('Error. Please check StarChat is running correctly (see https://getjenny.github.io/starchat-doc/#test-the-installation)');
          } else {
            console.log(res)
            if (res && res.body) {
              self.handleJennyResponse(res.body[0].bubble);
            }

            if (res.statusCode === 204) {
              self.handleJennyResponse("Sorry, I don't understand what you are saying -I still have limited capacity. Please try with 'get test state' to test the installation or ask 'how to install'");
            }
          }
        });
      }, 2500);
    }
  }

  handleJennyResponse(message) {
    this.addMessage(message, 'jenny', 'Jenny');
  }

  emptyChatMessage() {
    this.setState({ chatValue: '' });
  }

  handleChange(event) {
    this.setState({ chatValue: event.target.value });
  }

  addMessage(body, originator, author) {
    const newMessages = this.state.messages;
    const message = {body: body, originator: originator, author: author};
    const messagesDiv = document.getElementById("messages-container");

    newMessages.push(message);
    this.setState({ messages: newMessages });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>GetJenny demo</h2>
        </div>
        <div className="messages-container" id="messages-container">
          <MessageList messages={this.state.messages} />
        </div>
        <div className="App-footer">
          <div className="jenny-typing">
            <div className={this.state.showTyping ? 'show' : 'hide'}>Jenny is typing</div>
          </div>
          <form className="chat-form">
            <FormGroup controlId="formBasicText">
              <ControlLabel>How may I help?</ControlLabel>
              <FormControl
               bsSize="large"
               type="text"
               value={this.state.chatValue}
               placeholder="Type a message..."
               onKeyPress={this.handleKeyPress}
               onChange={this.handleChange}/>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
