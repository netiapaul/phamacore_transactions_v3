import React, { useMemo } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { AnalysisFilters } from "./analytics_filters";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { useAppDispatch, useAppSelector } from "store";
import { getProfitPicture } from "../../slices/dashboardAnalytics/thunk";

const ProfitPicture = () => {
  const dispatch = useAppDispatch();

  const { branches, startDate, endDate, isLoading, profitPicture } =
    useAppSelector((state) => state.DashboardAnalytics);

  const columns = useMemo(
    () => [
      {
        header: "Sale Time",
        accessorKey: "mysaletime",
        enableColumnFilter: false,
      },
      {
        header: "Total Sales",
        accessorKey: "mysalestotal",
        enableColumnFilter: false,
      },
      {
        header: "% Total Sales",
        accessorKey: "mysalestotalperc",
        enableColumnFilter: false,
      },
      {
        header: "Profit",
        accessorKey: "myprofit",
        enableColumnFilter: false,
      },
      {
        header: "% Profit",
        accessorKey: "myprofitperc",
        enableColumnFilter: false,
      },
      {
        header: "Profit Contrib",
        accessorKey: "totalbrn",
        enableColumnFilter: false,
      },
      {
        header: "AVG Sales",
        accessorKey: "myavgsales",
        enableColumnFilter: false,
      },
    ],
    [],
  );

  React.useEffect(() => {
    void dispatch(
      getProfitPicture({
        startDate: startDate,
        endDate: endDate,
        // bcodes: "",
      }),
    );
  }, [dispatch, branches, startDate, endDate]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Profit Picture" pageTitle="Dashboards" />

          <AnalysisFilters title="profit picture" />

          <Row>
            <Col md={12}>
              <Card className="card-animate">
                <CardBody>
                  <div>
                    <TableContainer
                      columns={columns}
                      data={profitPicture || []}
                      customPageSize={30}
                      divClass="table-responsive table-card"
                      tableClass="align-middle table-nowrap"
                      theadClass="table__header"
                      thClass="text-sm border table__header py-1"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProfitPicture;
