import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Zoom,
  useScrollTrigger,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PostAddIcon from "@material-ui/icons/PostAdd";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
const drawerWidth = 240;
// drawer item list
const SideBarcomponents = {
  DashboardIcon: DashboardIcon,
  AccountBalanceIcon: AccountBalanceIcon,
  PostAddIcon: PostAddIcon,
  ScheduleIcon: ScheduleIcon,
  LiveHelpIcon: LiveHelpIcon,
  MonetizationOnIcon: MonetizationOnIcon,
  TemplateIcon: BurstModeIcon,
};
const SideBarItems = [
  { name: "Dashboard", icon: "DashboardIcon" },
  { name: "Accounts", icon: "AccountBalanceIcon" },
  { name: "Create Post", icon: "PostAddIcon" },
  { name: "Posts", icon: "ScheduleIcon" },
  // { name: "Help Center", icon: "LiveHelpIcon" },
  // { name: "Billing", icon: "MonetizationOnIcon" },
  { name: "Templates", icon: "TemplateIcon" },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginTop: "64px",
    minHeight: "100vh",
    padding: "15px 15px 0 15px",
    // padding: theme.spacing(3),
  },
  sidebarlink: {
    color: "initial",
    "&:hover": {
      textDecoration: "none",
    },
  },
  active: {
    borderLeft: "3px solid #f50057",
  },
  favIcon: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  },
  homeLink: {
    color: "#000",
    "&:hover": {
      textDecoration: "none",
      color: "#000",
    },
  },
}));

// Scroll to Top Function
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role='presentation'
        className={classes.favIcon}
      >
        {children}
      </div>
    </Zoom>
  );
}

export default function SideDrawer({
  header,
  children,
  props,
  searchText,
  setSearchText,
}) {
  let Location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const createComponent = (icon, isCurrentTab) => {
    let Component = icon;
    return <Component style={{ color: isCurrentTab ? "#f50057" : "" }} />;
  };
  return (
    <>
      <div className={classes.root}>
        <NavBar
          handleDrawerOpen={handleDrawerOpen}
          drawerOpen={open}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography variant='h6' noWrap>
              <Link className={classes.homeLink} to='/'>
                <img
                  src={process.env.PUBLIC_URL + "/logo192.png"}
                  height='64px'
                  alt='logo'
                />
                GCC Tool
              </Link>
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {SideBarItems.map(({ name, icon }) => (
              <Link
                className={classes.sidebarlink}
                to={`/${name.toLowerCase().replace(/ +/g, "")}`}
                key={name}
              >
                <ListItem
                  className={
                    Location.pathname.includes(
                      `${name.toLowerCase().replace(/ +/g, "")}`
                    )
                      ? classes.active
                      : ""
                  }
                  button
                >
                  <ListItemIcon>
                    {createComponent(
                      SideBarcomponents[icon],
                      Location.pathname.includes(
                        `${name.toLowerCase().replace(/ +/g, "")}`
                      )
                    )}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div id='back-to-top-anchor' />
          <h2>{header}</h2>
          {children}
          <ScrollTop {...props}>
            <Fab color='secondary' size='small' aria-label='scroll back to top'>
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </main>
      </div>
      <Footer />
    </>
  );
}
