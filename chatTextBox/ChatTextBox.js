import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class ChatTextBox extends Component {
  state = {
    chatText: "",
  };

  userTyping = (e) => {
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ [e.target.name]: e.target.value });
  };

  userClickedInput = (e) => {
      this.props.messageReadFn()
  };

  isMessageValid = (text) => text && text.replace(/\s/g, "").length;

  submitMessage = () => {
    if (this.isMessageValid(this.state.chatText)) {
      this.props.submitMsgFn(this.state.chatText);
      this.setState({ chatText: "" });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="alon" className={classes.chatTextBoxContainer}>
        <TextField
          name="chatText"
          value={this.state.chatText}
          placeholder="Type Your Message"
          onChange={this.userTyping}
          onKeyUp={(e) => {
            e.keyCode === 13 ? this.submitMessage() : this.userTyping(e);
          }}
          id="chattextbox"
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}
        ></TextField>
        <Send className={classes.sendBtn} onClick={this.submitMessage}></Send>
      </div>
    );
  }
}

export default withStyles(styles)(ChatTextBox);
