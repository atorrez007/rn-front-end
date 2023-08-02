import axios from "axios";

export function getUserDetails(newUrl, token) {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_DETAILS", currentUrl: newUrl });
    try {
      const response = await axios.get(newUrl, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "GET_USER_DETAILS",
        reviewsWritten: response.data.notconfiguredyet,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const initialState = {
  userId: "",
  reviewsWritten: [],
  savedHospitals: [],
};
