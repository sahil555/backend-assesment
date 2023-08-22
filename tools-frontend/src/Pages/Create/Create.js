import React from "react";
import Layout from "../../components/Layout/Layout";
// import Typography from '@material-ui/core/Typography';
import ReactDropZone from "../../components/ReactDropZone/ReactDropZone";
import ReactSummerNote from "../../components/ReactSummerNote/ReactSummerNote";
import "bootstrap/dist/css/bootstrap.css";
const Create = () => {
  return (
    <div>
      <Layout title='Create' header='Create Post'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              <ReactDropZone />
            </div>
            <div className='col-md-sm'>
              <ReactSummerNote />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Create;
