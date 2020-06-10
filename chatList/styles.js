const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    right: "0",
    width: "300px",
    overflowY:'auto',
    boxShadow: "0px 0px 2px black",
  },
  listItem: {
    cursor: "pointer",
  },
  newChatBtn: {
    borderRadius: "0px",
    height: "50px",
    backgroundColor: "#227092",
    color: "white",
    "&:hover": {
      backgroundColor: "#60A3C1",
    },
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
});

export default styles;
