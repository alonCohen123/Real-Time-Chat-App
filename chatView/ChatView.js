import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

class ChatView extends Component {
  state = {};

  componentDidUpdate() {
      const container = document.getElementById('chatview-container')
      if(container){
          container.scrollTo(0, container.scrollHeight);
      }
  }

  render() {
    const { classes, chat, user } = this.props;
    if (chat === undefined) {
      return <main id ='chatview-container' className={classes.content}></main>;
    } else {
      return (
        <div>
          <div className={classes.chatHeader}>
            Your Conversation With {chat.users.filter((u) => u !== user)}
            {console.log(chat.users.filter((u) => u !== user))}
          </div>
          <main id='chatview-container' className={classes.content}>
            {chat.messages.map((msg, index) => {
              return (
                <div
                  key={index}
                  className={
                    msg.sender === user ? classes.userSent : classes.friendSent
                  }
                >
                  {msg.message}
                  <br/>
                  <div className={classes.timestamp}>
                  {msg.timestamp ? moment.unix(msg.timestamp/1000).utc().fromNow(): null}
                  </div>
                </div>
              );
            })}
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatView);
