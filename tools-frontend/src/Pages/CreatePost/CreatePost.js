import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { connect } from "react-redux";
import { Button, Paper } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import ReactDropZone from "../../components/ReactDropZone/ReactDropZone";
import ReactSummerNote from "../../components/ReactSummerNote/ReactSummerNote";
import ScheduleTimeDialog from "../../components/ScheduleTimeDialog/ScheduleTimeDialog";
import { Col, Container, Row } from "react-bootstrap";
import { createPost, clearPostState } from "../../actions/posts";
import {
  getUserTemplate,
  createUserTemplate,
  clearTemplateState,
} from "../../actions/templates";
import PopUpToast from "../../components/PopUpToast/PopUpToast";
import { b64toBlob } from "../../helpers/utils";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import ImageEditor from "../../components/ImageEditor/ImageEditor";
import TemplateCreateModal from "../../components/TemplateCreateModal/TemplateCreateModal";
import "./CreatePost.css";
const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};
var blob = null;
const blobHandler = async (url) => {
  // Get the form element withot jQuery
  var ImageURL = url?.canvas?.toDataURL();
  // Split the base64 string in data and contentType
  var block = ImageURL.split(";");
  // Get the content type of the image
  var contentType = block[0].split(":")[1]; // In this case "image/png"
  // get the real base64 content of the file
  var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

  // Convert it to a blob to upload
  blob = await b64toBlob(realData, contentType, null, url?.imageName);
};
const CreatePost = (props) => {
  const { templates, templateSuccess } = props.templates;
  const { success } = props.posts;

  const [image, setImage] = useState(null);
  const [show, toggle] = useState(false);
  const [templeteImage, setTempleteImage] = useState(null);

  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [files, setFiles] = useState(
    props?.location?.state?.canvas?.toDataURL()
  );
  const [disabled, setDisabled] = useState(true);
  const [scheduleDisable, setScheduleDisable] = useState(true);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);

  // template modal
  const [openModal, setOpenModal] = useState(true);
  const [templateData, setTemplateData] = useState(null);
  const [userTemplateSearch, setUserTemplateSearch] = useState(" ");

  if (props?.location?.state?.canvas) {
    blobHandler(props.location.state);
  }
  if (image?.canvas) {
    blobHandler(image);
  }
  useEffect(() => {
    if (userTemplateSearch === " ") {
      window.scroll(0, 0);
    } else {
      var elem = document.getElementById("3btns");
      elem.scrollIntoView();
    }
  }, [userTemplateSearch]);
  useEffect(() => {
    props.dispatch(clearPostState());
    props.dispatch(clearTemplateState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userTemplateSearch) {
      props.dispatch(getUserTemplate(userTemplateSearch));
    } else {
      setUserTemplateSearch(" ");
    }
    // eslint-disable-next-line
  }, [userTemplateSearch]);

  useEffect(() => {
    if (templateData !== null) {
      props.dispatch(
        createUserTemplate({ ...templateData, template_image: blob })
      );
      setOpenModal(false);
      setTemplateData(null);
      props.dispatch(getUserTemplate(userTemplateSearch));
    }
    // eslint-disable-next-line
  }, [templateData]);

  useEffect(() => {
    if (success || templateSuccess) {
      scrollToTop();
      setSuccessSnackBarOpen(true);
    } else {
      setSuccessSnackBarOpen(false);
    }
  }, [success, templateSuccess]);

  useEffect(() => {
    if (image?.canvas) {
      scrollToTop();
      setFiles(image.canvas.toDataURL());
    }
  }, [image]);

  useEffect(() => {
    if (!!text && !!subject && !!files) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [text, subject, files]);

  useEffect(() => {
    if (!!scheduleTime) {
      setScheduleDisable(false);
    } else {
      setScheduleDisable(true);
    }
  }, [scheduleTime]);

  const handleScheduleOpen = () => {
    setOpenSchedule(true);
  };
  const handleScheduleClose = () => {
    setOpenSchedule(false);
  };
  // Submit handlers
  const handleDraft = () => {
    let record = {
      title: subject,
      caption: text,
      post_scheduled: new Date().toISOString(),
      status: "draft",
      image: blob || files[0],
    };
    props.dispatch(createPost(record));
    handleClearState();
  };
  const handlePost = () => {
    let record = {
      title: subject,
      caption: text,
      post_scheduled: new Date().toISOString(),
      status: "post",
      image: blob || files[0],
    };
    props.dispatch(createPost(record));
    handleClearState();
  };
  const handleSchedule = () => {
    let record = {
      title: subject,
      caption: text,
      post_scheduled: scheduleTime,
      status: "schedule",
      image: blob || files[0],
    };
    props.dispatch(createPost(record));
    handleClearState();
    handleScheduleClose();
  };
  const handleClearState = () => {
    scrollToTop();
    props.dispatch(clearPostState());
    setText("");
    setSubject("");
    setScheduleTime("");
    setFiles(null);
    setImage(null);
  };
  return (
    <div>
      <Layout
        title='Create'
        header='Create Post'
        searchText={userTemplateSearch}
        setSearchText={setUserTemplateSearch}
      >
        {props?.location?.state?.canvas && (
          <TemplateCreateModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            setTemplateData={setTemplateData}
          />
        )}
        <Container>
          <Row>
            <Col>
              <ReactDropZone files={files} setFiles={setFiles} />
            </Col>
            <Col lg={7}>
              <ReactSummerNote
                subject={subject}
                text={text}
                setSubject={setSubject}
                setText={setText}
              />
              <div id='3btns' className='notebtn'>
                <Button
                  onClick={handleDraft}
                  disabled={disabled}
                  size='small'
                  variant='contained'
                  color='primary'
                  endIcon={<SaveIcon />}
                >
                  Draft
                </Button>
                <ScheduleTimeDialog
                  setScheduleTime={setScheduleTime}
                  handleSchedule={handleSchedule}
                  handleScheduleOpen={handleScheduleOpen}
                  handleScheduleClose={handleScheduleClose}
                  openSchedule={openSchedule}
                  scheduleDisable={scheduleDisable}
                  disabled={disabled}
                />
                <Button
                  onClick={handlePost}
                  disabled={disabled}
                  size='small'
                  variant='contained'
                  color='primary'
                  endIcon={<SendIcon />}
                >
                  Post
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Container>
              <div className='user-template'>My Templates</div>
              <Paper>
                <ImageGallery
                  setTempleteImage={setTempleteImage}
                  toggle={toggle}
                  images={templates}
                />
              </Paper>
            </Container>
          </Row>
          <PopUpToast
            successSnackBarOpen={successSnackBarOpen}
            setSuccessSnackBarOpen={setSuccessSnackBarOpen}
            vertical='top'
            horizontal='right'
            severity='success'
            message={success || templateSuccess}
          />
        </Container>
      </Layout>
      <ImageEditor
        image={image}
        setImage={setImage}
        toggle={toggle}
        show={show}
        templeteImage={templeteImage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  templates: state.templates,
});
export default connect(mapStateToProps)(CreatePost);
