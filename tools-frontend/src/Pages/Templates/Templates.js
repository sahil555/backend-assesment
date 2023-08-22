import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import Layout from "../../components/Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PopUpToast from "../../components/PopUpToast/PopUpToast";
import ImageEditor from "../../components/ImageEditor/ImageEditor";
import { clearTemplateState } from "../../actions/templates";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginLeft: "2px",
  },
}));
const Templates = (props) => {
  const { large } = useStyles();
  const [show, toggle] = useState(false);
  const [image, setImage] = useState(null);
  const [templeteImage, setTempleteImage] = useState(null);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  
  useEffect(() => {
    window.scroll(0, 0);
    props.dispatch(clearTemplateState());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (image) {
      setTempleteImage(null);
    } else if (templeteImage) {
      setImage(null);
    }
  }, [image, templeteImage]);

  return (
    <Layout title='Creative Studio' header='Creative Studio'>
      <span>Custom Image</span> &nbsp;
      <input type='file' onChange={(e) => setImage(e.target.files[0])} />
      <br />
      <br />
      <Avatar
        variant='rounded'
        src={
          image
            ? image.canvas
              ? image.canvas.toDataURL("image/png")
              : URL.createObjectURL(image)
            : null
        }
        onClick={
          image ? () => toggle(!show) : () => setSuccessSnackBarOpen(true)
        }
        alt='custom image'
        className={large}
      />
      <ImageEditor
        show={show}
        templeteImage={templeteImage}
        image={image}
        setImage={setImage}
        toggle={toggle}
      />
      <ImageGallery
        setTempleteImage={setTempleteImage}
        toggle={toggle}
        images={PHOTO_SET}
      />
      <PopUpToast
        successSnackBarOpen={successSnackBarOpen}
        setSuccessSnackBarOpen={setSuccessSnackBarOpen}
        vertical='top'
        horizontal='center'
        severity='error'
        message='Please update image'
      />
    </Layout>
  );
};
const PHOTO_SET = [
  {
    src: "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
    width: 1,
    height: 1,
    key: "1",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "2",
  },
  {
    src: "https://cdn.pixabay.com/photo/2019/10/30/15/45/thumb-4589867_960_720.jpg",
    width: 1,
    height: 1,
    key: "3",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "4",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "5",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "6",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "7",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "8",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "9",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "10",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "11",
  },
  {
    src: "https://cdn.pixabay.com/photo/2020/04/02/22/09/santorini-4996846_960_720.jpg",
    width: 1,
    height: 1,
    key: "12",
  },
  {
    src: "https://cdn.pixabay.com/photo/2019/10/30/15/45/thumb-4589867_960_720.jpg",
    width: 1,
    height: 1,
    key: "13",
  },
  {
    src: "https://cdn.pixabay.com/photo/2019/10/30/15/45/thumb-4589867_960_720.jpg",
    width: 1,
    height: 1,
    key: "14",
  },
];
const mapStateToProps = (state) => ({
  auth: state.auth,
  templates: state.templates,
});
export default connect(mapStateToProps)(Templates);
