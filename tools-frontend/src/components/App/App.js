import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackDrop from "../../components/Backdrop/Backdrop";
import {
  Home,
  Accounts,
  Billing,
  CreatePost,
  HelpCenter,
  Posts,
  Dashboard,
  ForgotPassword,
  SignUp,
  Page404,
  Login,
  PrivateRoute,
  ManageProfile,
  Templates,
} from "../";
import { authenticateUser } from "../../actions/auth";
import {
  getAuthAccessTokenFromCookie,
  getAuthRefreshTokenFromCookie,
} from "../../helpers/utils";
import "./App.css";
import { APIUrls } from "../../helpers/urls";
function App(props) {
  const [isSigningin, setIsSigningin] = useState(false);
  let dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let profile = useSelector((state) => state.profile);

  const fetchUserInfo = () => {
    var access_token = getAuthAccessTokenFromCookie();
    setIsSigningin(true);
    const response = fetch(APIUrls.home(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          document.cookie = "access_token=;";
          console.log("error", error);
          refreshToken();
        });
      } else {
        data.json().then(async function (data) {
          const {
            username,
            Email,
            Name,
            Phone,
            city,
            address,
            state,
            gender,
            country,
            description,
            pincode,
            user_picture,
            cover_picture,
            profile_id,
          } = data.Data;
          // user profile create for only first time after sign up
          if (!profile_id) {
            const resp = await fetch(APIUrls.createProfile(), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              // body: JSON.stringify(data),
            });
            resp.then(function (data) {
              if (!data.ok) {
                data.json().then(function (error) {
                  console.log("error", error);
                });
              } else {
                data.json().then(function (data) {});
              }
            });
          }

          await dispatch(
            authenticateUser({
              username: username,
              email: Email,
              name: Name,
              phone: Phone,
              city,
              state,
              gender,
              country,
              description,
              pincode,
              address,
              id: profile_id,
              user_picture,
              cover_picture,
            })
          );
          setIsSigningin(false);
        });
      }
    });
  };

  const refreshToken = () => {
    var refresh_token = getAuthRefreshTokenFromCookie();
    const response = fetch(APIUrls.refresh(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refresh_token }),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          document.cookie = "refresh_token =;";
          console.log("error", error);
        });
      } else {
        data.json().then(function (data) {
          var now = new Date();
          now.setTime(now.getTime() + 1 * 3600 * 1000);
          document.cookie = `access_token=${data.access}; expires=${now};`;
          fetchUserInfo();
        });
      }
    });
  };
  useEffect(() => {
    var access_token = getAuthAccessTokenFromCookie();
    var refresh_token = getAuthRefreshTokenFromCookie();
    if (access_token) {
      fetchUserInfo();
    }
    if (!access_token) {
      if (refresh_token) {
        refreshToken();
      }
    }
    // eslint-disable-next-line
  }, [getAuthAccessTokenFromCookie()]);

  useEffect(() => {
    if (Object.keys(profile.user).length !== 0) {
      dispatch(
        authenticateUser({
          ...auth.user,
          ...profile.user,
        })
      );
    }
    // eslint-disable-next-line
  }, [profile.user]);
  return (
    <div className='App'>
      {isSigningin ? (
        <BackDrop />
      ) : (
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path='/'
              component={Home}
              isLoggedin={auth.isLoggedin}
            />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <PrivateRoute
              path='/dashboard'
              component={Dashboard}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/manageprofile'
              component={ManageProfile}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/accounts'
              component={Accounts}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/billing'
              component={Billing}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/createpost'
              component={CreatePost}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/helpcenter'
              component={HelpCenter}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/posts'
              component={Posts}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path='/templates'
              component={Templates}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </Router>
      )}
    </div>
  );
}
// function mapStateToProps(state) {
//   console.log("start", state)
//   return {
//     auth: state.auth,
//   };
// }
export default App;
