import React from "react";
// import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

interface BreadCrumbProps {
  title: string;
  pageTitle: string;
}

const BreadCrumb = ({ title, pageTitle }: BreadCrumbProps) => {
  const authUser: any = localStorage.getItem("authUser");
  const allCompanyUsers = JSON.parse(authUser)["user"].allCompanyUsers || null;
  const loggedInUsers = JSON.parse(authUser)["user"].loggedInUsers || null;

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">{pageTitle}</li>
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>

            <h6 className="mb-sm-0">
              <span className="text-primary">
                Licensed Users:{" "}
                <span className="fw-bold text-danger">{allCompanyUsers}</span>
              </span>{" "}
              |{" "}
              <span className="text-primary">
                {/* <Link
                  to="/users-setup/loggedin-users"
                  role="button"
                  className="text-decoration-none"
                >
                  Loggedin Users:{" "}
                </Link> */}
                Loggedin Users:{" "}
                <span className="fw-bold text-danger">{loggedInUsers}</span>
              </span>
            </h6>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
