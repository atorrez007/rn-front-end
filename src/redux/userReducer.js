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
      dispatch({
        type: "GET_USER_REVIEWS",
        reviewsWritten: response.data.reviews,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function saveHospital(hospitalObject) {
  return (dispatch) => {
    dispatch({
      type: "SAVE_HOSPITAL",
      savedHospitals: hospitalObject,
    });
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
    case "SAVE_HOSPITAL":
      return {
        savedHospitals: [...state.savedHospitals, action.savedHospitals],
      };
    default:
      return state;
  }
}
