import BreadCrumb from "../../Components/Common/BreadCrumb";
import React from "react";
import { Container, Row } from "reactstrap";

const SalesAnalysis = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Sales Dashboard" pageTitle="Dashboards" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SalesAnalysis;
