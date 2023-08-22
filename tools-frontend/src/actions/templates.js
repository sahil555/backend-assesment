import {
  TEMPLATES_UPDATE,
  TEMPLATE_CREATE_SUCCESS,
  CLEAR_TEMPLATE_STATE,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getAuthAccessTokenFromCookie } from "../helpers/utils";

// fetch templates
export function getUserTemplate(title) {
  return (dispatch) => {
    const url = APIUrls.fetchUserTemplate(title);
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          console.log("error", error);
        });
      } else {
        data.json().then(function (data) {
          dispatch(updateTemplates(data));
        });
      }
    });
  };
}
export function clearTemplateState() {
  return {
    type: CLEAR_TEMPLATE_STATE,
  };
}
export function updateTemplates(templates) {
  return {
    type: TEMPLATES_UPDATE,
    templates,
  };
}
export function createTemplateSuccess(success) {
  return {
    type: TEMPLATE_CREATE_SUCCESS,
    success,
  };
}

// create template
export function createUserTemplate(content) {
  const formData = new FormData();
  formData.append("title", content.title);
  formData.append("template_image", content.template_image);
  formData.append("caption", content.caption);
  return (dispatch) => {
    const url = APIUrls.postUserTemplate();
    const response = fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
      body: formData,
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          console.log("error", error);
          // dispatch(signupFailed({ error }));
        });
      } else {
        data.json().then(function (data) {
          dispatch(createTemplateSuccess("Template Created Successfully"));
        });
      }
    });
  };
}
