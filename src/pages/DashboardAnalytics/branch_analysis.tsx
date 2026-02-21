import React, { useMemo } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { AnalysisFilters } from "./analytics_filters";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { useAppDispatch, useAppSelector } from "store";
import { getBranchAnalysis } from "../../slices/dashboardAnalytics/thunk";
import { numberFormatter } from "../../helpers/functions";

const BranchAnalysis = () => {
  const dispatch = useAppDispatch();

  const { branches, startDate, endDate, isLoading, branchAnalysis } =
    useAppSelector((state) => state.DashboardAnalytics);

  const columns = useMemo(
    () => [
      {
        header: "Branch",
        accessorKey: "brancH_NAME",
        enableColumnFilter: false,
      },
      {
        header: "OpStock",
        accessorKey: "opstock",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "NetTotalPurchases",
        accessorKey: "nettotalpurchases",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalBTR",
        accessorKey: "totalbtr",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalBRN",
        accessorKey: "totalbrn",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalAdjustments",
        accessorKey: "totaladjustments",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalSales",
        accessorKey: "totalsales",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalProfit",
        accessorKey: "totalprofit",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "% Profit",
        accessorKey: "percprofit",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "CloseStock",
        accessorKey: "closestock",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
    ],
    [],
  );

  React.useEffect(() => {
    void dispatch(
      getBranchAnalysis({
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
          <BreadCrumb title="Stock Analysis" pageTitle="Dashboards" />

          <AnalysisFilters title="profit picture" />

          <Row>
            <Col md={12}>
              <Card className="card-animate">
                <CardBody>
                  <div>
                    <TableContainer
                      columns={columns}
                      data={branchAnalysis || []}
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

export default BranchAnalysis;
