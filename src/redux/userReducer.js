import axios from "axios";

export function getUserReviews(newUrl, token) {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_REVIEWS", currentUrl: newUrl });
    try {
      const response = await axios.get(newUrl, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.reviews);
      dispatch({
        type: "GET_USER_REVIEWS",
        reviewsWritten: response.data.reviews,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const initialState = {
  reviewsWritten: [],
  savedHospitals: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_REVIEWS":
      return {
        ...state,
        reviewsWritten: action.reviewsWritten,
      };
    default:
      return state;
  }
}
