const styles = (theme) => ({
  content: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    padding: "25px",
    marginRight: "300px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "50px",
    width: "calc(100% - 300px)",
    position: "absolute",
  },

  userSent: {
    float: "left",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#2D94A9",
    color: "white",
    width: "68%",
    maxWidth:'350px',
    borderRadius: "10px",
  },

  friendSent: {
    float: "right",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#2D77A9",
    color: "white",
    width: "68%",
    maxWidth:'350px',
    borderRadius: "10px",
  },

  chatHeader: {
    width: "calc(100% - 301px)",
    height: "50px",
    backgroundColor: "#1B5B8B",
    position: "fixed",
    marginRight: "301px",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "10px",
    boxSizing: "border-box",
  },
  timestamp:{
    textAlign:'right',
    color:'#D6D6D6',
    fontSize:'13px'
  }
});

export default styles;
