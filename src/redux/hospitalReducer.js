export function getHospitals(newUrl) {
  return (dispatch) => {
    fetch(`${newUrl}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "GET_HOSPITALS", hospitals: data });
      });
  };
}

const initialState = {
  hospitals: [],
};

export default function hospitalReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_HOSPITALS":
      return {
        hospitals: action.hospitals,
      };
    default:
      return state;
  }
}
