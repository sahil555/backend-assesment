import {
  TEMPLATES_UPDATE,
  TEMPLATE_CREATE_SUCCESS,
  CLEAR_TEMPLATE_STATE,
} from "../actions/actionTypes";
const initialTemplateState = {
  templates: [],
  templateSuccess: null,
};
export default function posts(state = initialTemplateState, action) {
  switch (action.type) {
    case CLEAR_TEMPLATE_STATE:
      return {
        ...state,
        templateSuccess: null,
      };
    case TEMPLATES_UPDATE:
      return {
        ...state,
        templateSuccess: null,
        templates: action.templates,
      };

    case TEMPLATE_CREATE_SUCCESS:
      return {
        ...state,
        templateSuccess: action.success,
      };

    default:
      return state;
  }
}
