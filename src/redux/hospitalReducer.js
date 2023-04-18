export function getHospitals(newUrl) {
  return async (dispatch) => {
    fetch(`${newUrl}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "GET_HOSPITALS", hospitals: data });
      });
  };
}

export function getAllHospitals() {
  return (dispatch) => {
    fetch(`http://localhost:8000/hospitals?allHospitals=true`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "GET_ALL_HOSPITALS", allHospitals: data });
      });
  };
}
const initialState = {
  allHospitals: [],
  hospitals: [],
  loading: false,
  error: null,
};

export default function hospitalReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_HOSPITALS":
      return {
        hospitals: action.hospitals,
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
