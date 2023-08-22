import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Button,
  TextField,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  emailVerificationOTPCheck,
  emailVerificationOTP,
  forgotPasswordResend,
} from "../../actions/auth";
import "./Modal.css";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    maxWidth: "40%",
    padding: theme.spacing(2, 4, 3),
  },
  withoutLabel: {
    marginBottom: theme.spacing(2),
  },
  btnStyle: {
    width: "max-content",
    height: "100%",
    marginLeft: "20px",
  },
}));

function TransitionsModal({
  header,
  errors,
  email,
  number,
  setIsEmailVerified,
  setIsPhoneVerified,
  dispatch,
  auth,
}) {
  const { success, error } = auth;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isEmailOTPSent, setIsEmailOTPSent] = useState(false);
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(300);
  const [disabled, setDisabled] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(false);

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

  //   check OTP length to toggle verify button visibility
  useEffect(() => {
    if (value.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);
  const handleOpen = () => {
    if (header.includes("Email")) {
       dispatch(emailVerificationOTP(email));
    }
    if (header.includes("Number")) {
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCounter(0);
  };
  const handleVerify = async () => {
    if (header.includes("Email")) {
      await dispatch(emailVerificationOTPCheck({ email: email, otp: value }));
      if (success) {
        setIsEmailVerified(true);
        handleClose();
      } else {
        setIsEmailVerified(false);
      }
    }
  };
  const handleResendOTP = async () => {
    if (header.includes("Email")) {
      await dispatch(forgotPasswordResend(email));
      setResendDisabled(true);
    }
  };
  return (
    <div>
      <Button
        className={clsx(classes.btnStyle)}
        disabled={
          (header.includes("Email") && !email && !errors) || errors.length > 0
            ? true
            : (header.includes("Number") && !number && !errors) ||
              errors.length > 0
            ? true
            : false
        }
        variant='contained'
        color='primary'
        onClick={handleOpen}
      >
        Send OTP
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div elevation={10} className={classes.paper}>
            <h2 className={clsx(classes.withoutLabel)}>{header}</h2>
            <Grid container justify='space-between'>
              <FormControl className={clsx(classes.withoutLabel)} fullWidth>
                {error && (
                  <Alert variant='filled' severity='error'>
                    {error.error || error}
                  </Alert>
                )}
                {success && (
                  <Alert variant='filled' severity='success'>
                    {success}
                  </Alert>
                )}
              </FormControl>
              <FormControl
                id='signUpName'
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
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                disabled={disabled}
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
                    disabled={resendDisabled}
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </Button>
                ))}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(TransitionsModal);
