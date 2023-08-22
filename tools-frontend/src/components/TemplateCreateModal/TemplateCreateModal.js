import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core/";
import { Form } from "react-bootstrap";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function TemplateCreateModal({ setOpenModal, openModal, setTemplateData }) {
  const [templateName, setTemplateName] = useState("");
  const [templateCaption, setTemplateCaption] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!!templateName && !!templateCaption) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [templateName, templateCaption]);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleCreateTemplate = () => {
    setDisabled(true);
    setTemplateData({ title: templateName, caption: templateCaption });
  };

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {"Create Template"}
        </DialogTitle>
        <DialogContent>
          <div id='alert-dialog-slide-description'>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type='text'
                placeholder='Enter template name'
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='caption'>
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter template caption'
                value={templateCaption}
                onChange={(e) => setTemplateCaption(e.target.value)}
              />
            </Form.Group>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>

          <Button
            onClick={handleCreateTemplate}
            variant='contained'
            disabled={disabled}
            color='primary'
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default TemplateCreateModal;
