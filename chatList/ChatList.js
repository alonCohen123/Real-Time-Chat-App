import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import moment from "moment";

class ChatList extends Component {
  state = {};

  newChat = () => {
    this.props.newChatBtnFn();
  };

  selectChat = (index) => {
    this.props.selectChatFn(index);
  };

  userIsSender = (chat) => {
    return (
      chat.messages[chat.messages.length - 1].sender === this.props.userEmail
    );
  };

  render() {
    const { classes } = this.props;

    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
          <Typography component='h1' variant="h5" className={classes.userGreat}>
            Hello {this.props.userEmail}
          </Typography>
          <Button
            varient="contained"
            fullWidth
            color="primary"
            className={classes.newChatBtn}
            onClick={this.newChat}
          >
            New Chat
          </Button>
          <List className={classes.list}>
            {this.props.chats.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem
                    alignItems="flex-start"
                    selected={index === this.props.selctedChatIndex}
                    className={classes.listitem}
                    onClick={() => this.selectChat(index)}
                  >
                    <ListItemAvatar>
                      <Avatar alt="avatar">
                        {
                          chat.users
                            .filter((u) => u !== this.props.userEmail)[0]
                            .split("")[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      primary={
                        chat.users.filter((u) => u !== this.props.userEmail)[0]
                      }
                      secondary={
                        <>
                          <Typography component="span" color="textPrimary">
                            {chat.messages[
                              chat.messages.length - 1
                            ].message.substring(0, 30)}
                          </Typography>
                          <Typography component="span" className={classes.timestamp}>
                            {
                              moment.unix(chat.lastUpdate/1000).utc().fromNow()
                            }
                          </Typography>
                        </>
                      }
                    ></ListItemText>
                    {chat.receiverHasRead === false &&
                    !this.userIsSender(chat) ? (
                      <ListItemIcon>
                        <NotificationImportant
                          className={classes.unreadMessage}
                        ></NotificationImportant>
                      </ListItemIcon>
                    ) : null}
                  </ListItem>
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button
            varient="contained"
            fullWidth
            color="primary"
            className={classes.newChatBtn}
            onClick={this.newChat}
          >
            New Message
          </Button>
          <List></List>
        </main>
      );
    }
  }
}

export default withStyles(styles)(ChatList);
