import React from "react";
import ReactSummernote from "react-summernote"; //or we can use ck editor rich text editor
import "react-summernote/dist/react-summernote.css"; // import styles
import $ from "jquery";
// Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "./ReactSummerNote.css";
window.jquery = $;
require("bootstrap");
const ReactSummerNote = ({ setText, setSubject, subject, text }) => {
  return (
    <div>
      <input
        type='text'
        className='form-control'
        id='subject'
        aria-describedby='subject'
        placeholder='Subject'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <ReactSummernote
        value={text}
        options={{
          lang: "en-us",
          height: 350,
          // dialogsInBody: true,
          placeholder: "Write Something",
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            // ["insert", ["link", "picture", "video"]],
            ["view", ["codeview"]],
          ],
        }}
        onChange={(event) => setText(event)}
      />
    </div>
  );
};

export default ReactSummerNote;
