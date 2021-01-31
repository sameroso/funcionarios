export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload || false;
    case "SAVE_USER":
      return [...state, [action.payload]];
    case "DELETE_USER":
      return state.filter((employees) => {
        return employees._id !== action.payload;
      });
    default:
      return state;
  }
};
