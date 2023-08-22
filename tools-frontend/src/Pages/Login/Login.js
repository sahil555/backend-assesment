import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { Link, useHistory } from "react-router-dom";
import { login, clearAuthState } from "../../actions/auth";
import "./login.css";
const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2),
  },
  withoutLabel: {
    marginBottom: theme.spacing(2),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

const Login = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  // Ankuragarwal1#
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [reCaptchaValue, setrReCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { error, inProgress, isLoggedin } = props.auth;
  const { from } = props.location.state || { from: { pathname: "/" } };
  useEffect(() => {
    if (isLoggedin) {
      history.push(from);
    }
    // eslint-disable-next-line
  }, [isLoggedin]);
  useEffect(() => {
    props.dispatch(clearAuthState());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!!username && !!password && !!reCaptchaValue) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password, reCaptchaValue]);

  useEffect(() => {
    if (error) {
      if (error.password) {
        setPasswordError(error.password);
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [error]);
  const handleRecaptchaValue = (value) => {
    setrReCaptchaValue(value);
  };
  const handleLoginButton = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      // setUsernameError("");
      setPasswordError("Password must be at least 8 characters");
      return;
    } else {
      setDisabled(true);
      // setSigningIn(true);
      props.dispatch(login(username, password));
    }
  };
  // const handleGoogleLoginButton = async () => {
  //   setDisabled(true);
  //   setSigningIn(true);
  //   const res = await firebase.signInWithGoogle();
  //   //  console.log("res dgfgfg", res);
  //   const { success, error } = res;
  //   if (success) {
  //     return history.push("/");
  //   } else {
  //     setError(error);
  //     setSigningIn(false);
  //     setDisabled(false);
  //   }
  // };
  return (
    <div className='loginGrid'>
      {/* <Grid item lg={5} sm={3} xm={2}> */}
      <Grid item lg={4}>
        <Paper style={{ padding: "20px" }} elevation={10} className='loginForm'>
          <Grid className={clsx(classes.padding)} align='center'>
            <Avatar className={classes.pink}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <h2>LOGIN</h2>
            <p>Welcome back! Please login to your account</p>
          </Grid>
          {error && (
            <Alert
              className={clsx(classes.withoutLabel)}
              variant='filled'
              severity='error'
            >
              {error}
            </Alert>
          )}
          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            <TextField
              autoFocus
              id='outlined-secondary'
              label='Enter Username'
              type='text'
              variant='outlined'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>

          <FormControl
            className={clsx(classes.withoutLabel)}
            variant='outlined'
            required
            fullWidth
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>

            <OutlinedInput
              error={passwordError.length > 0}
              id='outlined-adornment-password'
              placeholder='Enter Password'
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
            {passwordError.length > 0 && (
              <FormHelperText style={{ color: "red" }}>
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>
          <Grid className={clsx(classes.withoutLabel)} align='center'>
            <ReCAPTCHA
              // style={{ display: "inline-block", border: "1px solid red", textAlign: "center" }}
              // ref={this._reCaptchaRef}
              sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
              // type="audio"
              onChange={handleRecaptchaValue}
              // asyncScriptOnLoad={this.asyncScriptOnLoad}
            />
          </Grid>
          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={disabled && !inProgress}
              onClick={handleLoginButton}
            >
              Login
            </Button>
          </FormControl>
          <FormControl>
            <Typography>
              <Link to='/forgot-password'>Forgot Password ?</Link>
            </Typography>
          </FormControl>
          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            <Typography>
              Don't have an account ? <Link to='/sign-up'>Create Account</Link>
            </Typography>
          </FormControl>
        </Paper>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Login);
