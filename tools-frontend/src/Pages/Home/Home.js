import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout/Layout";

const Home = (props) => {
  const { auth } = props;
  return (
    <div>
      <Layout title='Home' header='Home'>
        <p>{auth.user.username}</p>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Home);
