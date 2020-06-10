const styles = (theme) => ({
  sendBtn: {
    marginTop:'5px',
    color: "black",
    cursor: "pointer",
    height:'20px',
    "&:hover": {
      color: "gray",
    },
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "10px",
    right: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)",
    margin: "5px 0",
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },
});

export default styles;
