import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./PostEditModal.css";
import { Button } from "@material-ui/core";
import { Form } from "react-bootstrap";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function PostEditModal({
  handleClose,
  open,
  post_scheduled,
  title,
  caption,
  image,
  status,
  u_id,
  handlePostUpdate,
  setUpdatedPostData,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newStatus, setNewStatus] = useState(status);
  const [newScheduleTime, setNewScheduleTime] = useState(post_scheduled);
  const [newCaption, setNewCaption] = useState(caption);
  const [newImage, setNewImage] = useState(image);

  useEffect(() => {
    let record = {
      title: newTitle,
      status: newStatus,
      caption: newCaption,
      post_scheduled: newScheduleTime,
      image: newImage,
      u_id: u_id,
    };
    setUpdatedPostData(record);
    // eslint-disable-next-line
  }, [newTitle, newStatus, newScheduleTime, newCaption, newImage]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{"Edit post"}</DialogTitle>
        <DialogContent>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              value={newTitle}
              placeholder='Enter subject'
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              value={newCaption}
              placeholder='Enter caption'
              as='textarea'
              rows={3}
              onChange={(e) => setNewCaption(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              as='select'
              defaultValue={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value='post'>Post</option>
              <option value='draft'>Draft</option>
              <option value='schedule'>Schedule</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              value={newScheduleTime}
              type='datetime-local'
              onChange={(e) => setNewScheduleTime(e.target.value)}
            />
          </Form.Group>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handlePostUpdate}
            variant='contained'
            color='primary'
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
