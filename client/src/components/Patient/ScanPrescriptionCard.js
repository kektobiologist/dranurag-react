import React from "react";
import { Row, Col } from "reactstrap";
import cloudinary from "cloudinary";
import { withRouter } from "react-router-dom";
import Spinner from "../util/Spinner";

class ScanPrescriptionCard extends React.Component {
  state = {
    imgSrc: "",
    loading: false
  };

  onScanClicked = () => {
    this.setState({ loading: true });
    fetch(process.env.REACT_APP_SCAN_URL)
      .then(res => res.text())
      .then(res =>
        this.setState({
          imgSrc: `data:image/jpg;base64,${res}`,
          loading: false
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  onSaveClicked = () => {
    this.setState({ loading: true });
    const { imgSrc } = this.state;
    const { patientId, history } = this.props;
    cloudinary.v2.uploader.unsigned_upload(
      imgSrc,
      process.env.REACT_APP_CLOUDINARY_UNSIGNED_KEY,
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        tags: "browser_uploads"
      },
      (error, result) => {
        if (!error)
          fetch("/api/addPicturePrescription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: patientId,
              url: result.url
            }),
            credentials: "include"
          })
            .then(res => res.json())
            .then(() => this.setState({ loading: false }))
            // hack : https://github.com/ReactTraining/react-router/issues/1982#issuecomment-305735126
            .then(() => history.go(0));
      }
    );
  };

  render() {
    const { imgSrc, loading } = this.state;
    return (
      <div className="card-deck w-50">
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <a
                  id="scan-pr"
                  className="btn btn-outline-primary mr-2"
                  href="#"
                  role="button"
                  onClick={this.onScanClicked}
                >
                  Scan Prescription
                </a>
              </div>
              <div className="py-2">
                <Spinner loading={loading} size={10} />
              </div>
              {imgSrc ? (
                <div>
                  <a
                    id="save-pr"
                    className="btn btn-outline-primary"
                    href="#"
                    role="button"
                    onClick={this.onSaveClicked}
                  >
                    Save
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <form>
            <input type="hidden" name="file" className="upload_field" />
          </form>
          <div className="thumbnails" />
          <img src={imgSrc} id="scanned_img" className="w-100" />
        </div>
      </div>
    );
  }
}

ScanPrescriptionCard = withRouter(ScanPrescriptionCard);
export default ScanPrescriptionCard;
