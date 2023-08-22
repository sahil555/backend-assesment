import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { Row, Col } from "react-bootstrap";
import {
  userChangePassword,
  clearAuthState,
  logoutUser,
} from "../../actions/auth";
import Button from "@material-ui/core/Button";
import ManageProfileDetails from "../../components/ManageProfileDetails/ManageProfileDetails";
import ManageProfileForm from "../../components/ManageProfileForm/ManageProfileForm";
import "react-phone-input-2/lib/bootstrap.css";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { updateUserProfile } from "../../actions/profile";
import PopUpToast from "../../components/PopUpToast/PopUpToast";
const ManageProfile = (props) => {
  const { auth, profile } = props;
  const { inProgress, error, success, user } = auth;
  const [updateData, setUpdateData] = useState(null);
  const [changePassword, setChangePassword] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userCoverImage, setUserCoverImage] = useState(null);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
    props.dispatch(clearAuthState());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (changePassword !== null) {
      props.dispatch(userChangePassword(changePassword));
      setChangePassword(null);
    }
    // eslint-disable-next-line
  }, [changePassword]);

  useEffect(() => {
    if (profile.success) {
      setSuccessSnackBarOpen(true);
    }
  }, [profile.success]);

  const logOut = () => {
    props.dispatch(logoutUser());
  };
  const handleUpdateProfile = () => {
    if (updateData !== null) {
      props.dispatch(
        updateUserProfile({
          ...updateData,
          user_picture: userProfileImage && userProfileImage,
          cover_picture: userCoverImage && userCoverImage,
        })
      );
    }
  };
  return (
    <div>
      <Layout title='Manage Account' header='Manage Account'>
        <Row>
          <Col sm={12} md={12} lg={5}>
            <ManageProfileDetails
              user={user}
              userProfileImage={userProfileImage}
              setUserProfileImage={setUserProfileImage}
              setUserCoverImage={setUserCoverImage}
              userCoverImage={userCoverImage}
            />
            <ChangePassword
              setChangePassword={setChangePassword}
              inProgress={inProgress}
              error={error}
              success={success}
              logOut={logOut}
            />
          </Col>
          <Col>
            <ManageProfileForm user={user} setUpdateData={setUpdateData} />
            <Button
              variant='contained'
              color='secondary'
              onClick={handleUpdateProfile}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Layout>
      <PopUpToast
        successSnackBarOpen={successSnackBarOpen}
        setSuccessSnackBarOpen={setSuccessSnackBarOpen}
        vertical='top'
        horizontal='center'
        severity='success'
        message='Profile Updated Succesfully'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(ManageProfile);
