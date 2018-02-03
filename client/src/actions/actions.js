export var changeLoginState = state => ({
  type: "CHANGE_LOGIN_STATE",
  value: state
});

var updatePatientData = patientData => ({
  type: "UPDATE_PATIENT_DATA",
  value: patientData
});

var clearPatientData = () => ({
  type: "CLEAR_PATIENT_DATA"
});

export var fetchPatientData = patientId => (dispatch, getState) => {
  if (getState().patientData.patientId != patientId)
    // clear patient data if its not the same patient
    dispatch(clearPatientData());
  fetch(`/api/patientData/${patientId}`, { credentials: "include" })
    .then(res => res.json())
    .then(res => dispatch(updatePatientData(res)));
};

export var refreshPatientScannedPrescriptions = () => (dispatch, getState) => {
  const patientData = getState().patientData;
  const { patientId } = patientData;
  if (!patientId) return; // can't do shit
  fetch(`/api/patientScannedPrescriptions/${patientId}`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(scannedPrescriptions =>
      dispatch(updatePatientData({ ...patientData, scannedPrescriptions }))
    );
};
