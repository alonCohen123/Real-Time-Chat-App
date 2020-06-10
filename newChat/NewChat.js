import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  withStyles,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import styles from "./styles";
const firebase = require("firebase");

class NewChat extends Component {
  state = {
    email: "",
    message: "",
    err: "",
  };

  userTyping = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitNewChat = async (e) => {
    e.preventDefault();
    if (firebase.auth().currentUser.email !== this.state.email) {
      const userExists = await this.userExists();
      if (userExists) {
        const chatExists = await this.chatExists();
        chatExists ? this.goToChat() : this.createChat();
      } else {
        this.setState({ err: "Sorry User Not Found" });
      }
    }
    else{
      this.setState({ err: "Sorry You Can't Start A Conversation With Yourself" });
    }
  };

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.email,
      message: this.state.message,
    });
  };

  goToChat = () => {
    this.props.goToChatFn(this.buildDocKey(), this.state.message);
  };

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.email]
      .sort()
      .join(":");
  };

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };

  userExists = async () => {
    const usersSnapshot = await firebase.firestore().collection("users").get();
    const exists = usersSnapshot.docs
      .map((doc) => doc.data().email)
      .includes(this.state.email);
    // this.setState({
    //   serverError: !exists,
    // });
    return exists;
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Send A Message!
          </Typography>
          <form className={classes.form} onSubmit={this.submitNewChat}>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-username">
                Your Friend's email
              </InputLabel>
              <Input
                value={this.state.email}
                name="email"
                required
                className={classes.input}
                autoFocus
                onChange={this.userTyping}
                id="new-chat-username"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-message">
                Enter Your Message
              </InputLabel>
              <Input
                value={this.state.message}
                name="message"
                required
                className={classes.input}
                onChange={this.userTyping}
                id="new-chat-message"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              className={classes.submit}
              varient="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          <div className={classes.errorText}>{this.state.err}</div>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(NewChat);
