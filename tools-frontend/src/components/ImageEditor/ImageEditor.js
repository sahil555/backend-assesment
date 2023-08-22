import FilerobotImageEditor from "filerobot-image-editor";
import { useHistory } from "react-router-dom";
const ImageEditor = ({ show, templeteImage, image, setImage, toggle }) => {
  let history = useHistory();
  return (
    <FilerobotImageEditor
      show={show}
      config={{
        translations: {
          en: {
            "header.image_editor_title": " GCC Image Editor",
            // "toolbar.download": "Create Template",
          },
        },
      }}
      src={
        (!templeteImage && image?.size && image) ||
        (!templeteImage &&
          image?.canvas &&
          image.canvas?.toDataURL("image/png")) ||
        (templeteImage && templeteImage)
      }
      onComplete={(props) => {
        setImage(props);
        history.push({ pathname: "/createpost", state: props });
      }}
      onClose={() => {
        toggle(false);
      }}
    />
  );
};

export default ImageEditor;
