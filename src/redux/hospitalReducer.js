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
      .get(`http://localhost:8000/hospitals?allHospitals=true`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "GET_ALL_HOSPITALS", allHospitals: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

const initialState = {
  // currentHospital
  allHospitals: [],
  hospitals: [],
  currentUrl: `http://localhost:8000/hospitals?page=1&state=&city=&query=`,
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
    default:
      return state;
  }
}
