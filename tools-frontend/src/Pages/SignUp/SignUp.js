import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import Modal from "../../components/Modal/Modal";
import { connect } from "react-redux";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { signup, clearAuthState } from "../../actions/auth";
import "react-phone-input-2/lib/material.css";
import "react-phone-number-input/style.css";
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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import "./SignUp.css";
import PopUpToast from "../../components/PopUpToast/PopUpToast";
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

const UserSignUp = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  // const [errors, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [check, setCheck] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const { inProgress, error, isLoggedin, user } = props.auth;
  useEffect(() => {
    if (isLoggedin) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isLoggedin]);
  useEffect(() => {
    if (user.username) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    props.dispatch(clearAuthState());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (
      !!email &&
      !!password &&
      !!confirmPassword &&
      !!firstName &&
      !!lastName &&
      !!username &&
      !!number &&
      !!check
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    email,
    password,
    confirmPassword,
    username,
    firstName,
    lastName,
    number,
    check,
  ]);

  useEffect(() => {
    if (
      email &&
      !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
    ) {
      setNameError("");
      setPasswordError("");
      setUsernameError("");
      // setError("");
      return setEmailError("Enter valid email");
    } else {
      setEmailError("");
    }
  }, [email]);
  useEffect(() => {
    if (error) {
      if (error.username) {
        setUsernameError(error.username);
      } else {
        setUsernameError("");
      }
      if (error.email) {
        setEmailError(error.email);
      } else {
        setEmailError("");
      }
      if (error.phone) {
        setNumberError(error.phone);
      } else {
        setNumberError("");
      }
      if (error.password) {
        setPasswordError(error.password);
      } else {
        setPasswordError("");
      }
    }
  }, [error]);

  useEffect(() => {
    if (number && !isValidPhoneNumber("+" + number)) {
      setPasswordError("");
      setEmailError("");
      setUsernameError("");
      setNameError("");
      return setNumberError("Please enter a valid number");
    } else {
      setNumberError("");
    }
  }, [number]);

  const handleSignUpButton = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setUsernameError("");
    setEmailError("");
    setNameError("");
    if (firstName.length === 0) {
      return setNameError("Please enter valid name");
    }
    if (lastName.length === 0) {
      return setNameError("Please enter valid name");
    }
    if (username.length === 0) {
      return setUsernameError("Please enter valid username");
    }
    if (password.length < 8) {
      return setPasswordError("Password must be at least eight characters");
    }
    if (password !== confirmPassword) {
      return setPasswordError("Password do not match.");
    }
    // if (!isEmailVerified) {
    //   return setEmailError("Please verify your email first");
    // }
    setDisabled(true);
    // setSigningIn(true);
    const newRecord = {
      name: firstName + " " + lastName,
      phone: "+" + number,
      email: email,
      password: password,
      username: username,
    };
    props.dispatch(signup(newRecord));
  };
  const emailVerifiedToast = () => {
    setSuccessSnackBarOpen(true);
  };
  return (
    <div className='signupGrid'>
      {/* xl={3} xm={1} sm={12} */}
      <Grid item lg={5} md={6} sm={11} xm={10}>
        <Paper
          elevation={10}
          style={{ padding: "20px" }}
          className='signupForm'
        >
          <Grid align='center'>
            <Avatar className={classes.pink}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <h2>Register</h2>
            <p>Please complete to create your account</p>
          </Grid>
          {/* {errors && (
            <Alert
              className={clsx(classes.withoutLabel)}
              variant='filled'
              severity='error'
            >
              {errors}
            </Alert>
          )} */}
          <Grid container justify='space-between'>
            <FormControl id='signUpName' className={clsx(classes.withoutLabel)}>
              <TextField
                error={nameError.length > 0}
                helperText={nameError}
                autoFocus
                id='outlined-first-name'
                label='Enter First Name'
                type='text'
                variant='outlined'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='signUpName' className={clsx(classes.withoutLabel)}>
              <TextField
                error={nameError.length > 0}
                helperText={nameError}
                id='outlined-last-name'
                label='Enter Last Name'
                type='text'
                variant='outlined'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <FormControl
            id='signUpName'
            className={clsx(classes.withoutLabel)}
            fullWidth
          >
            <TextField
              error={usernameError.length > 0}
              helperText={usernameError}
              id='outlined-username'
              label='Username'
              type='text'
              variant='outlined'
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <div
            style={{ display: "flex" }}
            className={clsx(classes.withoutLabel)}
          >
            <FormControl fullWidth>
              <TextField
                error={emailError.length > 0}
                helperText={emailError}
                id='outlined-email'
                label='Enter Email'
                type='email'
                variant='outlined'
                placeholder='example@mail.com'
                value={email}
                disabled={isEmailVerified}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            {isEmailVerified ? (
              <span
                style={{
                  alignItems: "center",
                  display: "inline-flex",
                  width: "max-content",
                  marginLeft: "20px",
                  fontSize: "10px",
                  justifyContent: "center",
                }}
              >
                <VerifiedUserIcon />
                <i>Verified</i>
              </span>
            ) : (
              <Modal
                header='Verify your Email'
                email={email}
                errors={emailError}
                setIsEmailVerified={setIsEmailVerified}
              />
            )}
          </div>

          <div
            style={{ display: "flex" }}
            className={clsx(classes.withoutLabel)}
          >
            <FormControl
              style={{ height: "calc(1.5em + 1.75rem + 2px)" }}
              fullWidth
              onClick={
                isEmailVerified === false ? emailVerifiedToast : undefined
              }
            >
              <PhoneInput
                enableSearch
                autocompleteSearch
                country={"in"}
                disabled={!isEmailVerified}
                value={number}
                onChange={setNumber}
                required
              />
              <FormHelperText style={{ color: "red", marginTop: "0" }}>
                {numberError}
              </FormHelperText>
            </FormControl>
            {/* {isPhoneVerified ? (
              <span>Verified</span>
            ) : (
              <Modal
                header='Verify your Number'
                number={`+${number}`}
                errors={numberError}
                setIsPhoneVerified={setIsPhoneVerified}
              />
            )} */}
          </div>
          <FormControl
            className={clsx(classes.withoutLabel)}
            onClick={isEmailVerified === false ? emailVerifiedToast : undefined}
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
              disabled={!isEmailVerified}
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

          <FormControl
            className={clsx(classes.withoutLabel)}
            onClick={isEmailVerified === false ? emailVerifiedToast : undefined}
            variant='outlined'
            required
            fullWidth
          >
            <InputLabel htmlFor='outlined-adornment-confirm-password'>
              Confirm Password
            </InputLabel>

            <OutlinedInput
              error={passwordError.length > 0}
              id='outlined-adornment-confirm-password'
              disabled={!isEmailVerified}
              placeholder='Enter Password'
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              labelWidth={150}
            />
            {passwordError.length > 0 && (
              <FormHelperText style={{ color: "red" }}>
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={() => setCheck(!check)}
                name='rememberMe'
              />
            }
            label='I agree with terms and conditions'
          />
          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            {!inProgress && (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={disabled}
                onClick={handleSignUpButton}
              >
                Create Account
              </Button>
            )}
          </FormControl>
          <Typography align='right'>
            Already have an Account ? <Link to='/login'>Login</Link>
          </Typography>
        </Paper>
      </Grid>
      <PopUpToast
        successSnackBarOpen={successSnackBarOpen}
        setSuccessSnackBarOpen={setSuccessSnackBarOpen}
        vertical='top'
        horizontal='right'
        severity='error'
        message='Please verify your email first'
      />
    </div>
  );
};
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default connect(mapStateToProps)(UserSignUp);
