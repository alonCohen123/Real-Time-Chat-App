import React, { Component } from "react";
import { Link } from "react-router-dom";
// import React from 'react';
import styles from "./styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
const firebase = require("firebase");

class Signup extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    signupError: "",
  };

  submitSignup = (e) => {
    e.preventDefault();
    if (!this.isValidForm()) {
      this.setState({ signupError: "Passwords do not match!" });
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (authRes) => {
          const userObj = {
            email: authRes.user.email,
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push("/");
              },
              (dbError) => {
                console.log(dbError);
                this.setState({ signupError: "FFailed To Add User" });
              }
            );
        },
        (authErr) => {
          console.log(authErr);
          this.setState({ signupError: authErr.message });
        }
      );
  };

  isValidForm = () => {
    return this.state.password === this.state.password_confirmation;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" varient="h5">
            Sign Up!
          </Typography>
          <form onSubmit={this.submitSignup} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                autoComplete="email"
                autoFocus
                id="signup-email-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Create a Password
              </InputLabel>
              <Input
                value={this.state.password}
                name="password"
                type="password"
                onChange={this.handleChange}
                id="signup-password-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Your Password
              </InputLabel>
              <Input
                value={this.state.email_confirmation}
                name="password_confirmation"
                type="password"
                onChange={this.handleChange}
                id="signup-password-confirmation-input"
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              varient="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.signupError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              varient="h6"
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            varient="h6"
            className={classes.hasAccountHeader}
          >
            Already Have An Account?
          </Typography>
          <Link className={classes.logInLink} to="/login">
            Log In!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Signup);
