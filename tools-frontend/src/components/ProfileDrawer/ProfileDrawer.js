import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CreateSharpIcon from "@material-ui/icons/CreateSharp";
import { connect } from "react-redux";
import {
  Avatar,
  MenuItem,
  Typography,
  Drawer,
  Divider,
} from "@material-ui/core";
import "./ProfileDrawer.css";
const useStyles = makeStyles((theme) => ({
  list: {
    width: "40vw",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  fullList: {
    width: "auto",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    top: "110px",
  },
  drawerTabs: {
    textAlign: "center",
    backgroundColor: "#bd203f",
    padding: "10px",
    color: "#ffe1ef",
    textTransform: "uppercase",
    borderRadius: "2px",
    marginBottom: "0",
    boxShadow: "0 0 5px 2px #000",
  },
}));

function ProfileDrawer(props) {
  let history = useHistory();
  const { user } = props.auth;
  const classes = useStyles();
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsProfileDrawerOpen(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <span
        className='profile-drawer '
        style={{
          backgroundImage: `url(${
            user?.cover_picture && `api${user.cover_picture}`
          })`,
        }}
      >
        <span
          style={{
            position: "absolute",
            right: "3px",
            top: "2px",
            cursor: "pointer",
          }}
          title='Edit Profile'
          onClick={() => history.push("/manageaccount")}
        >
          <CreateSharpIcon color='secondary' />
        </span>
        <Avatar
          alt={user?.name[0]}
          src={`api${user.user_picture}`}
          className={classes.large}
        />
      </span>

      <Typography align='center'>{user.username}</Typography>
      <Divider />
      <div className='twoDivContainer'>
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
          style={{ marginBottom: "0" }}
        >
          {user.name}
        </Typography>
        {user?.gender !== "null" && (
          <Typography
            paragraph
            variant='caption'
            className={clsx(classes.drawerTabs)}
          >
            <strong>Gender :</strong> {user.gender}
          </Typography>
        )}
      </div>

      {user?.description !== "null" && (
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
          style={{
            textAlign: "justify",
          }}
        >
          {user.description}
        </Typography>
      )}

      <div className='twoDivContainer'>
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
        >
          <PhoneIcon
            fontSize='small'
            style={{ color: "rgba(255,255,255,0.8)" }}
          />
          {user.phone}
        </Typography>
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
        >
          <MailIcon
            fontSize='small'
            style={{ color: "rgba(255,255,255,0.8)" }}
          />
          {user.email}
        </Typography>
      </div>
      {user?.address !== "null" && (
        <Typography
          paragraph
          variant='caption'
          style={{ textAlign: "justify" }}
          className={clsx(classes.drawerTabs)}
        >
          <LocationOnIcon
            fontSize='small'
            style={{ color: "rgba(255,255,255,0.8)" }}
          />
          {user.address}
        </Typography>
      )}
      {user?.pincode !== 0 && (
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
        >
          <strong>pincode :</strong> {user.pincode}
        </Typography>
      )}
      {user?.city !== "null" && (
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
        >
          <strong>City :</strong> {user.city}
        </Typography>
      )}
      {user?.state !== "null" && (
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
        >
          <strong>State :</strong> {user.state}
        </Typography>
      )}
      {user?.country !== "null" && (
        <Typography
          paragraph
          variant='caption'
          className={clsx(classes.drawerTabs)}
        >
          <strong>Country :</strong> {user.country}
        </Typography>
      )}
    </div>
  );

  return (
    <div>
      <MenuItem onClick={toggleDrawer(true)}>Profile</MenuItem>
      <Drawer
        anchor='right'
        open={isProfileDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProfileDrawer);
