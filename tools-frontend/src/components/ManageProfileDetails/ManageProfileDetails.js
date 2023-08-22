import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Badge, Typography } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import "./ManageProfileDetails.css";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
const ManageProfileDetails = ({
  user,
  setUserProfileImage,
  userProfileImage,
  setUserCoverImage,
  userCoverImage,
}) => {
  const classes = useStyles();
  return (
    <div className='manage-account'>
      <span
        className='manage-account-profile'
        style={{
          backgroundImage: `url(${
            userCoverImage !== null
              ? URL.createObjectURL(userCoverImage)
              : user.cover_picture && `api${user.cover_picture}`
          })`,
        }}
      >
        <span
          style={{
            position: "absolute",
            right: "3px",
            top: "2px",
          }}
        >
          <CameraAltIcon color='secondary' />
          <input
            className='custom-image-input'
            type='file'
            onChange={(e) => setUserCoverImage(e.target.files[0])}
          />
        </span>

        <Badge
          style={{ top: "113px" }}
          overlap='circle'
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <span
              style={{
                position: "relative",
                backgroundColor: "#fff",
                borderRadius: "15px",
                padding: "3px",
              }}
            >
              <CameraAltIcon color='secondary' />
              <input
                className='custom-image-input'
                type='file'
                onChange={(e) => setUserProfileImage(e.target.files[0])}
              />
            </span>
          }
        >
          <Avatar
            style={{ border: "2px solid #fff" }}
            alt={user.username && user.username[0]}
            src={
              userProfileImage !== null
                ? URL.createObjectURL(userProfileImage)
                : user?.user_picture && `api${user.user_picture}`
            }
            className={classes.large}
          />
        </Badge>
      </span>
      <Typography align='center'>{user.username}</Typography>
      <Typography paragraph variant='h6'>
        Email
      </Typography>
      <Typography
        paragraph
        style={{
          textAlign: "justify",
        }}
      >
        {user?.email}
      </Typography>
      <Typography paragraph variant='h6'>
        Phone
      </Typography>
      <Typography
        paragraph
        style={{
          textAlign: "justify",
        }}
      >
        {user?.phone}
      </Typography>
      <Typography paragraph variant='h6'>
        Description
      </Typography>
      <Typography
        paragraph
        style={{
          textAlign: "justify",
        }}
      >
        {user?.description === "null" ? "" : user?.description}
      </Typography>
    </div>
  );
};

export default ManageProfileDetails;
