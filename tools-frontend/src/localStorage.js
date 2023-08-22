export const loadState = () => {
    try {
      const data = localStorage.getItem("notes");
      if (data === null) {
        return undefined;
      }
      return JSON.parse(data);
    } catch (error) {
      console.log("error", error);
      return undefined;
    }
  };
  
  export const saveState = (notes) => {
    try {
      const data = JSON.stringify(notes);
      localStorage.setItem("notes", data);
    } catch (error) {
      console.log("error", error);
    }
  };