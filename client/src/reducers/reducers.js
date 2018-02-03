export var loginReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN_STATE":
      return action.value;
    default:
      return state;
  }
};

const initPatientData = {
  id: null,
  patient: null,
  scannedPrescriptions: null,
  generatedPrescriptions: null,
  latestPrescription: null,
  invoices: null
};

export var patientDataReducer = (state = initPatientData, action) => {
  switch (action.type) {
    case "UPDATE_PATIENT_DATA":
      return action.value;
    case "CLEAR_PATIENT_DATA":
      return initPatientData;
    default:
      return state;
  }
};

const initTodaysVisits = {
  loading: false,
  visits: []
};

export var todaysVisitsReducer = (state = initTodaysVisits, action) => {
  switch (action.type) {
    case "UPDATE_TODAYS_VISITS":
      return { ...state, visits: action.value };
    case "SET_FETCHING_TODAYS_VISITS":
      return { ...state, loading: action.value };
    default:
      return state;
  }
};
