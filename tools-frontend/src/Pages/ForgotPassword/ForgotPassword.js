import React, { useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  forgotPassword,
  forgotPasswordOTPVerification,
  forgotPasswordChangePassword,
  forgotPasswordResend,
} from "../../actions/auth";
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

const ForgotPassword = (props) => {
  const classes = useStyles();
  // const [signingIn, setSigningIn] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [counter, setCounter] = useState(300);
  const [errors, setError] = useState(null);
  const [OTPValue, setOTPValue] = useState("");
  const [isOTPButtonDisabled, setIsOTPButtonDisabled] = useState(true);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isEmailOTPSent, setIsEmailOTPSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createAccountButton, setCreateAccountButton] = useState(false);
  const { error, success, inProgress } = props.auth;


  useEffect(() => {
    if (success) {
      setIsEmailOTPSent(true);
    } else {
      setIsEmailOTPSent(false);
    }
      // eslint-disable-next-line
  }, [success]);

  useEffect(() => {
    if (isEmailOTPSent) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, isEmailOTPSent]);

  useEffect(() => {
    if (!!email) {
      setDisabled(false);
    } else {
      setError(null);
      setEmailError("");
      setDisabled(true);
    }
  }, [email]);
  useEffect(() => {
    if (OTPValue.length >= 8) {
      setError(null);
      setIsOTPButtonDisabled(false);
    } else {
      setIsOTPButtonDisabled(true);
    }
  }, [OTPValue]);

  useEffect(() => {
    if (!!password && !!confirmPassword) {
      setPasswordError("");
      setCreateAccountButton(false);
    } else {
      setCreateAccountButton(true);
    }
  }, [password, confirmPassword]);

  const handleSendOTPButton = () => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      return setEmailError("Enter valid Email");
    } else {
      setEmailError("");
      setDisabled(true);
      // setSigningIn(true);
      props.dispatch(forgotPassword(email));
    }
  };
  const handleVerify = async () => {
    await props.dispatch(
      forgotPasswordOTPVerification({ email: email, otp: OTPValue })
    );
    if (!error) {
      setIsOTPVerified(true);
    }
  };
  const handlePasswordChange = () => {
    if (password.length < 8) {
      setError(null);
      setPasswordError("Password must be at least eight characters");
      return;
    }
    if (password !== confirmPassword) {
      return setPasswordError("Password do not match.");
    }
    props.dispatch(
      forgotPasswordChangePassword({
        email: email,
        new_password: confirmPassword,
      })
    );
  };
  const handleResendOTP = () => {
    props.dispatch(forgotPasswordResend(email));
  };
  return (
    <div className='loginGrid'>
      <Grid item lg={5}>
        <Paper style={{ padding: "20px" }} elevation={10} className='loginForm'>
          <Grid className={clsx(classes.padding)} align='center'>
            <Avatar className={classes.pink}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <h2>Forgot Password</h2>
            {/* <p>Welcome back! Please login to your account</p> */}
          </Grid>
          {(errors || error) && (
            <Alert
              className={clsx(classes.withoutLabel)}
              variant='filled'
              severity='error'
            >
              {errors || error}
            </Alert>
          )}
          {success && (
            <Alert
              className={clsx(classes.withoutLabel)}
              variant='filled'
              severity='success'
            >
              {success}
            </Alert>
          )}
          {!isOTPVerified ? (
            <span>
              <FormControl className={clsx(classes.withoutLabel)} fullWidth>
                <TextField
                  disabled={success}
                  error={emailError.length > 0}
                  helperText={emailError}
                  autoFocus
                  id='outlined-email'
                  label='Enter Email'
                  type='email'
                  variant='outlined'
                  placeholder='example@mail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              {success ? (
                <Grid container justify='space-between'>
                  <FormControl
                    id='otpverify'
                    className={clsx(classes.withoutLabel)}
                    fullWidth
                  >
                    <TextField
                      autoComplete='off'
                      error={error}
                      autoFocus
                      id='outlined-secondary'
                      label='Enter OTP'
                      type='number'
                      variant='outlined'
                      placeholder='OTP'
                      value={OTPValue}
                      onChange={(e) => setOTPValue(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Button
                    disabled={isOTPButtonDisabled}
                    variant='contained'
                    color='primary'
                    onClick={handleVerify}
                  >
                    Verify
                  </Button>
                  {isEmailOTPSent &&
                    (counter > 0 ? (
                      `${parseInt(counter / 60)} : ${counter % 60}`
                    ) : (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </Button>
                    ))}
                </Grid>
              ) : (
                <FormControl className={clsx(classes.withoutLabel)} fullWidth>
                  {!inProgress ? (
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={disabled}
                      onClick={handleSendOTPButton}
                    >
                      SEND OTP
                    </Button>
                  ) : (
                    <span style={{ display: "flex", justifyContent: "center"}}>
                      <CircularProgress color='secondary' />
                    </span>
                  )}
                </FormControl>
              )}
            </span>
          ) : (
            <span>
              {/* Password start */}
              <FormControl
                className={clsx(classes.withoutLabel)}
                variant='outlined'
                required
                fullWidth
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  New Password
                </InputLabel>

                <OutlinedInput
                  error={passwordError.length > 0}
                  autoFocus
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
              {/* Password end */}
              {/* Confirm Password start */}
              <FormControl
                className={clsx(classes.withoutLabel)}
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
              {/* Confirm Password end */}
              {/* Change Password button start */}
              <Grid align='center' className={clsx(classes.withoutLabel)}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={createAccountButton}
                  onClick={handlePasswordChange}
                >
                  Change Password
                </Button>
              </Grid>
              {/* Change Password button end */}
            </span>
          )}
          {/* Already have an account start */}
          <FormControl fullWidth>
            <Typography>
              Already have an Account ? <Link to='/login'>Login</Link>
            </Typography>
          </FormControl>
          {/* Already have an account end */}
        </Paper>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ForgotPassword);
