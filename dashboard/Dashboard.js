import React, { Component } from "react";
import ChatList from "../chatList/ChatList";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";
import ChatView from "../chatView/ChatView";
import ChatTextBox from "../chatTextBox/ChatTextBox";
import NewChat from "../newChat/NewChat";

const firebase = require("firebase");
class Dashboard extends Component {
  state = {
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    chats: [],
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_user) => {
      if (!_user) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _user.email)
          .onSnapshot(async (res) => {
            const chats = res.docs.map((_doc) => _doc.data());
            await this.setState({
              email: _user.email,
              chats: chats,
            });
            console.log(this.state);
          });
      }
    });
  }

  newChatBtnClicked = () => {
    this.setState(prevState =>({
      newChatFormVisible: !prevState.newChatFormVisible,
      selectedChat: null,
    }));
  };

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  buildDocKey = (friend) => {
    return [this.state.email, friend].sort().join(":");
  };

  submitMessage = (msg) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (u) => u !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (u) => u !== this.state.email
      )[0]
    );
    if (this.clickChatWhereNotSender(this.state.selectedChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("clicked where the sender is the current user");
    }
  };

  clickChatWhereNotSender = (chatIndex) => {
    return (
      this.state.chats[chatIndex].messages[
        this.state.chats[chatIndex].messages.length - 1
      ].sender !== this.state.email
    );
  };

  goToChat = async (docKey, message) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find((chat) =>
      usersInChat.every((user) => chat.users.includes(user))
    );
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(message);
  };

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [this.state.email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email,
            timestamp: Date.now(),
          },
        ],
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.dashboard} id="dashboard-container">
        <ChatList
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selctedChatIndex={this.state.selectedChat}
          history={this.props.history}
        />
        {this.state.newChatFormVisible ? <NewChat
            newChatSubmitFn={this.newChatSubmit}
            goToChatFn={this.goToChat}
          /> : (
          <ChatView
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
          />
        )}
        {this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
          <ChatTextBox
            messageReadFn={this.messageRead}
            submitMsgFn={this.submitMessage}
          />
        ) : null}
        <Button className={classes.signOutBtn} onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
