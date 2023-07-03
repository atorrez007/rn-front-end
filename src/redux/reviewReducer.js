import axios from "axios";

export function getReviews(newUrl, token) {
  return async (dispatch) => {
    dispatch({ type: "SET_URL", currentUrl: newUrl });
    console.log(`new url is ${newUrl}`);
    try {
      const response = await axios.get(newUrl, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "GET_REVIEWS", reviews: response.data[0].reviews });
    } catch (error) {
      console.log(error);
    }
  };
}

const initialState = {
  reviews: [],
  currentUrl: ``,
};
export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_URL":
      return {
        ...state,
        currentUrl: action.currentUrl,
      };
    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.reviews,
      };
    default:
      return state;
  }
}
