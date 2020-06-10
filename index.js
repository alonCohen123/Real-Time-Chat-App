import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router} from 'react-router-dom'
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Dashboard from "./dashboard/Dashboard";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDzXmSjpJBOAtemXB7OiHSe-Z3Fs7S14HE",
  authDomain: "web-chat-fc70f.firebaseapp.com",
  databaseURL: "https://web-chat-fc70f.firebaseio.com",
  projectId: "web-chat-fc70f",
  storageBucket: "web-chat-fc70f.appspot.com",
  messagingSenderId: "1037530161790",
  appId: "1:1037530161790:web:f79d28f6f068615fd26e2f",
  measurementId: "G-FM98W209T0",
});
const routing = (
  <Router>
    <div id="routing container">
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route exact path="/" component={Dashboard}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
