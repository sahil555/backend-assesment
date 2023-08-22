import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Slide from "@material-ui/core/Slide";
import {
  FacebookLoginButton,
  // TwitterLoginButton,
  InstagramLoginButton,
  GithubLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons";
import { APIUrls } from "../../helpers/urls";
import "./CreateAccountModal.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateAccountModal({
  setInstagramClick,
  setGithubClick,
  setLinkedInClick,
  setFacebookClick,
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (social) => {
    if (social === "facebook") {
      setFacebookClick(true);
    }
    if (social === "instagram") {
      setInstagramClick(true);
    }
    if (social === "github") {
      setGithubClick(true);
    }
    if (social === "linkedin") {
      setLinkedInClick(true);
    }
  };
  return (
    <div className='create-account-modal'>
      <div className='account-add-btn' onClick={handleClickOpen}>
        <CreateNewFolderIcon fontSize='large' color='primary' />
        <span>Add Account</span>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {"Add New Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel='noreferrer'
              onClick={() => handleClick("facebook")}
              href={APIUrls.socialAccountsLogin("facebook")}
            >
              <FacebookLoginButton />
            </a>
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleClick("instagram")}
              href={APIUrls.socialAccountsLogin("instagram")}
              target="_blank"
              rel='noreferrer'
            >
              <InstagramLoginButton />
            </a>
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleClick("github")}
              href={APIUrls.socialAccountsLogin("github")}
              target="_blank"
              rel='noreferrer'
            >
              <GithubLoginButton />
            </a>
            <a
              style={{ textDecoration: "none" }}
              onClick={() => handleClick("linkedin")}
              href={APIUrls.socialAccountsLogin("linkedin")}
              target="_blank"
              rel='noreferrer'
            >
              <LinkedInLoginButton />
            </a>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
