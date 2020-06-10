import React, { Component } from "react";
import { Link } from "react-router-dom";
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
class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: "",
  };

  submitLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/");
        },
        (err) => {
          this.setState({ loginError: err.message });
          console.log(err);
        }
      );
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
            Log In!
          </Typography>
          <form className={classes.form} onSubmit={this.submitLogin}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email-input">Enter Your Email</InputLabel>
              <Input
                name="email"
                value={this.state.email}
                type="email"
                autoComplete="email"
                autoFocus
                id="email-input"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password-input">
                Enter Your Password
              </InputLabel>
              <Input
                name="password"
                value={this.state.password}
                type="password"
                id="password-input"
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              varient="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
          {this.state.loginError ? (
            <Typography
              component="h5"
              varient="h6"
              className={classes.errorText}
            >
              {this.state.loginError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            varient="h6"
            className={classes.noAccountHeader}
          >
            Don't Have An Account Yet?
          </Typography>
          <Link className={classes.signUpLink} to="/signup">
            Sign Up!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);
