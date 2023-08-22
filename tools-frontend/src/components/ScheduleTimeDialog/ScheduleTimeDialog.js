import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import ScheduleIcon from "@material-ui/icons/Schedule";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function ScheduleTimeDialog({
  disabled,
  setScheduleTime,
  handleSchedule,
  handleScheduleOpen,
  handleScheduleClose,
  openSchedule,
  scheduleDisable,
}) {
  return (
    <div>
      <Button
        onClick={handleScheduleOpen}
        disabled={disabled}
        size='small'
        variant='contained'
        color='primary'
        endIcon={<BackupIcon />}
      >
        Schedule
      </Button>
      <Dialog
        open={openSchedule}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleScheduleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{"Select Time"}</DialogTitle>
        <DialogContent>
          <TextField
            id='datetime-local'
            label='Schedule Post'
            type='datetime-local'
            //   defaultValue='2017-05-24T10:30'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleClose} color='primary'>
            Back
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={scheduleDisable}
            size='small'
            variant='contained'
            color='primary'
            endIcon={<ScheduleIcon />}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
