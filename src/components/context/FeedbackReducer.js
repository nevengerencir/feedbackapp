const FeedbackReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        texty: action.payload,
      };
    default:
      return state;
  }
};
//action is usually an object that indicates a type that is usually string
export default FeedbackReducer;
