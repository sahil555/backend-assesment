import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import BlogCard from "../../components/BlogCard/BlogCard";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchPosts, editPost, clearPostState } from "../../actions/posts";
import "./Posts.css";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const PostSchedule = (props) => {
  useEffect(() => {
    window.scroll(0,0);
    props.dispatch(clearPostState());
    // eslint-disable-next-line
  }, []);
  const { posts, drafts, schedules, success } = props.posts;
  const classes = useStyles();
  const [type, setType] = useState(0);
  const [updatedPostData, setUpdatedPostData] = useState();
  const [userPostSearch, setUserPostSearch] = useState(" ");
  const handleChange = (event, newValue) => {
    setType(newValue);
  };

  useEffect(() => {
    if (type === 0) {
      props.dispatch(fetchPosts(userPostSearch, "schedule"));
    }
    if (type === 1) {
      props.dispatch(fetchPosts(userPostSearch, "draft"));
    }
    if (type === 2) {
      props.dispatch(fetchPosts(userPostSearch, "post"));
    }
    // eslint-disable-next-line
  }, [type, success, userPostSearch]);

  const handlePostUpdate = () => {
    props.dispatch(editPost(updatedPostData));
  };

  return (
    <div>
      <Layout
        title='Posts'
        header=''
        searchText={userPostSearch}
        setSearchText={setUserPostSearch}
      >
        <Paper className={classes.root}>
          <Tabs
            value={type}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            // centered
          >
            <Tab label='Schedule' />
            <Tab label='Draft' />
            <Tab label='Published' />
          </Tabs>
        </Paper>
        {type === 0 && (
          <div className='blog-container'>
            {schedules.length > 0 ? (
              schedules.map(
                ({ post_scheduled, title, caption, image, status, u_id }) => (
                  <div key={`${image}${post_scheduled}`}>
                    <BlogCard
                      post_scheduled={post_scheduled}
                      title={title}
                      caption={caption}
                      image={image}
                      u_id={u_id}
                      success={success}
                      status={status}
                      handlePostUpdate={handlePostUpdate}
                      setUpdatedPostData={setUpdatedPostData}
                    />
                  </div>
                )
              )
            ) : (
              <div className='no-blog'>No post to show</div>
            )}
          </div>
        )}
        {type === 1 && (
          <div className='blog-container'>
            {drafts.length > 0 ? (
              drafts.map(
                ({ post_scheduled, title, caption, image, status, u_id }) => (
                  <div key={post_scheduled}>
                    <BlogCard
                      post_scheduled={post_scheduled}
                      title={title}
                      caption={caption}
                      image={image}
                      status={status}
                      u_id={u_id}
                      success={success}
                      setUpdatedPostData={setUpdatedPostData}
                      handlePostUpdate={handlePostUpdate}
                    />
                  </div>
                )
              )
            ) : (
              <div className='no-blog'>No post to show</div>
            )}
          </div>
        )}
        {type === 2 && (
          <div className='blog-container'>
            {posts.length > 0 ? (
              posts.map(
                ({ post_scheduled, title, caption, image, status, u_id }) => (
                  <div key={post_scheduled}>
                    <BlogCard
                      post_scheduled={post_scheduled}
                      title={title}
                      caption={caption}
                      image={image}
                      status={status}
                      u_id={u_id}
                      success={success}
                      setUpdatedPostData={setUpdatedPostData}
                      handlePostUpdate={handlePostUpdate}
                    />
                  </div>
                )
              )
            ) : (
              <div className='no-blog'>No post to show</div>
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps)(PostSchedule);
