import axios from "axios";

// Going to need getHospitalbyId helper-method to get hospital byID in hospitalDetails.js
export function getHospitals(newUrl, token) {
  return async (dispatch) => {
    dispatch({ type: "SET_HOSPITALS_URL", currentUrl: newUrl });
    try {
      const response = await axios.get(newUrl, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "GET_HOSPITALS", hospitals: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export const SET_CITY = "SET_CITY";
export const SET_STATE = "SET_STATE";

export function getAllHospitals(token) {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/hospitals?allHospitals=true`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: "GET_ALL_HOSPITALS", allHospitals: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getSelectedHospital(newUrl, token) {
  return async (dispatch) => {
    try {
      const response = await axios.get(newUrl, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // Can I dispatch user's savedHospitals helper methods and store the selected hospital payload into the user's savedHospitals?
      dispatch({
        type: "GET_SELECTED_HOSPITAL",
        selectedHospital: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const initialState = {
  // currentHospital
  allHospitals: [],
  hospitals: [],
  selectedHospital: [],
  currentUrl: `${process.env.REACT_APP_API_BASE_URL}/hospitals?page=1&state=&city=&query=`,
  loading: false,
  error: null,
};

export default function hospitalReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_HOSPITALS":
      return {
        ...state,
        hospitals: action.hospitals,
      };
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "SET_STATE":
      return {
        ...state,
        state: action.payload,
      };
    case "SET_HOSPITALS_URL":
      return {
        ...state,
        currentUrl: action.currentUrl,
      };
    case "GET_ALL_HOSPITALS":
      return {
        ...state,
        allHospitals: action.allHospitals,
      };
    case "GET_SELECTED_HOSPITAL":
      return {
        ...state,
        selectedHospital: action.selectedHospital,
      };
    default:
      return state;
  }
}
