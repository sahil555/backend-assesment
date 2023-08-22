const initialState = {
    data: [],
  };
  
  const signIn = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_NOTE":
        return {
          ...state,
          data: [
            {
              ...action.data,
              id: action.id,
            },
            ...state.data,
          ],
        };
      case "DELETE_NOTE":
        const newData = state.data.filter((note) => note.id !== action.id);
        return {
          ...state,
          data: newData,
        };
      // case "EDIT_NOTE":
      //   state.data.map((note) => {
      //     if (note.id === action.data.id) {
      //       note.title = action.data.title;
      //       note.description = action.data.description;
      //       note.date = action.data.date;
      //     }
      //   });
      //   return state;
      default:
        return state;
    }
  };
  
  export default signIn;