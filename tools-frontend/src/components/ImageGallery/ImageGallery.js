import React, { useEffect, useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import { useHistory } from "react-router-dom";
import Carousel, { Modal, ModalGateway } from "react-images";
const ImageGallery = ({ setTempleteImage, toggle, images }) => {
  let history = useHistory();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [newImagesArray, setNewImagesArray] = useState(
    images?.length > 0 && images
  );
  // changing images array as per the gallery requirement
  useEffect(() => {
    if (
      history.location.pathname.includes("/createpost") &&
      images?.length > 0
    ) {
      images?.forEach((obj) => {
        renameKey(obj, "template_image", "src");
        obj["height"] = 1;
        obj["width"] = 1;
        obj["key"] = obj?.u_id?.toString();
      });
      setNewImagesArray(images);
    }
    // eslint-disable-next-line
  }, [images]);

  function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  // *******************

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    setTempleteImage(e.target.currentSrc);
    e.target.currentSrc ? toggle(true) : toggle(false);
    closeLightbox();
  };
  return (
    <div>
      {newImagesArray?.length > 0 ? (
        <Gallery
          direction={"column"}
          columns={(containerWidth) => {
            // if (containerWidth >= 500):3;
            // if (containerWidth >= 900) return 3;
            if (containerWidth >= 1100) return 4;
          }}
          onClick={openLightbox}
          photos={newImagesArray}
        />
      ) : (
        <span>No Templates to show</span>
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <span
              onClick={(e) => {
                handleImageClick(e);
              }}
            >
              <Carousel
                currentIndex={currentImage}
                views={newImagesArray?.map((x) => ({
                  ...x,
                  srcset: x.src,
                  caption: x.title,
                }))}
              />
            </span>
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default ImageGallery;
