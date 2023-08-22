import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import { Form, Col, InputGroup } from "react-bootstrap";
import PopUpToast from "../PopUpToast/PopUpToast";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function ChangePassword({
  setChangePassword,
  inProgress,
  error,
  success,
  logOut,
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);

  useEffect(() => {
    if (!!password && !!confirmPassword && !!oldPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword, oldPassword]);

  useEffect(() => {
    if (success) {
      handleClose();
      setSuccessSnackBarOpen(true);
      logOut();
    }
    // eslint-disable-next-line
  }, [success]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setOldPassword("");
    setConfirmPassword("");
  };
  const handleUpdatePassword = () => {
    setPasswordError("");
    if (password.length < 8) {
      return setPasswordError("Password must be at least eight characters");
    }
    if (password !== confirmPassword) {
      return setPasswordError("Password do not match.");
    }
    setDisabled(true);
    setChangePassword({
      old_password: oldPassword,
      new_password: password,
    });
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {"Change Password?"}
        </DialogTitle>
        <DialogContent>
          {error &&
            error.new_password &&
            error.new_password.map((err) => (
              <Alert
                style={{ marginBottom: "1vw" }}
                variant='filled'
                severity='error'
              >
                <strong>New Password:</strong> {err}
              </Alert>
            ))}
          {error &&
            error.old_password &&
            error.old_password.map((err) => (
              <Alert
                style={{ marginBottom: "1vw" }}
                variant='filled'
                severity='error'
              >
                <strong>Old Password:</strong> {err}
              </Alert>
            ))}
          <div id='alert-dialog-slide-description'>
            <Form.Group as={Col} controlId='oldpassword'>
              <Form.Label>Old Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showOldPassword ? "text" : "password"}
                  placeholder='Enter password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <InputGroup.Append>
                  <Button
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    variant='outlined'
                  >
                    {showOldPassword ? "Hide" : "Show"}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId='newpassword'>
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup.Append>
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    variant='outlined'
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              {passwordError && (
                <Form.Text style={{ color: "red" }}>{passwordError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId='confirmnewpassword'>
              <Form.Label>Confirm New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputGroup.Append>
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant='outlined'
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              {passwordError && (
                <Form.Text style={{ color: "red" }}>{passwordError}</Form.Text>
              )}
            </Form.Group>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          {!inProgress && (
            <Button
              onClick={handleUpdatePassword}
              variant='contained'
              disabled={disabled}
              color='primary'
            >
              Update Password
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <PopUpToast
        successSnackBarOpen={successSnackBarOpen}
        setSuccessSnackBarOpen={setSuccessSnackBarOpen}
        vertical='top'
        horizontal='center'
        severity='success'
        message={success}
      />
    </div>
  );
}
export default ChangePassword;
