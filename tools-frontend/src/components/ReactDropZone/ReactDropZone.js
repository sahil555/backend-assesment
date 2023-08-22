import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Container } from "react-bootstrap";
import { Button, Typography, Paper } from "@material-ui/core";
const dropContainer = {
  marginBottom: "1.5vw",
  padding: "0",
};
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 140,
  height: 140,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  justifyContent: "center",
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function ReactDropZone({ setFiles, files }) {
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    height: "200px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },

    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    // eslint-disable-next-line
    [isDragActive, isDragReject, isDragAccept]
  );
  var thumbs = null;
  if (typeof files === "object") {
    thumbs = files?.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt={file.name} />
        </div>
      </div>
    ));
  } else if (!files) {
    thumbs = null;
  } else {
    thumbs = (
      <div style={thumb}>
        <div style={thumbInner}>
          <img src={files} style={img} alt='template' />
        </div>
      </div>
    );
  }

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (typeof files === "object") {
        files?.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    },
    [files]
  );

  return (
    <Container style={dropContainer}>
      {/* <h4>Upload</h4> */}
      <Paper>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Typography style={{ textAlign: "center" }}>
            Drag and drop files here <br /> or
          </Typography>
          <Button onClick={open} variant='contained' color='primary'>
            Choose file
          </Button>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </Paper>
    </Container>
  );
}
