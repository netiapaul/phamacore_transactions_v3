import React, { useMemo } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { useAppDispatch, useAppSelector } from "store";
import { getCashierAnalysis } from "../../slices/dashboardAnalytics/thunk";
import { numberFormatter, dateFormatter } from "../../helpers/functions";

const CashierAnalysis = () => {
  const dispatch = useAppDispatch();

  const { branches, startDate, endDate, isLoading, cashierAnalysis } =
    useAppSelector((state) => state.DashboardAnalytics);

  const columns = useMemo(
    () => [
      {
        header: "Branch",
        accessorKey: "brancH_NAME",
        enableColumnFilter: false,
      },
      {
        header: "Date",
        accessorKey: "timeout",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          dateFormatter.format(new Date(getValue())),
      },
      {
        header: "TimeIn",
        accessorKey: "timeout",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          dateFormatter.format(new Date(getValue())),
      },
      {
        header: "TimeOut",
        accessorKey: "timeout",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          dateFormatter.format(new Date(getValue())),
      },
      {
        header: "Shift No",
        accessorKey: "tillsessno",
        enableColumnFilter: false,
      },
      {
        header: "Cashier",
        accessorKey: "tilluser",
        enableColumnFilter: false,
      },
      {
        header: "Till Name",
        accessorKey: "tillname",
        enableColumnFilter: false,
      },
      {
        header: "System Amount",
        accessorKey: "systemAMount",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Declared Amount",
        accessorKey: "declaredAmount",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Variance",
        accessorKey: "variance",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <div
              className={
                cell.row.original.systemAMount -
                  cell.row.original.declaredAmount <
                0
                  ? "text-danger"
                  : cell.row.original.systemAMount -
                        cell.row.original.declaredAmount >
                      0
                    ? "text-success"
                    : ""
              }
            >
              {numberFormatter.format(
                Number(
                  cell.row.original.systemAMount -
                    cell.row.original.declaredAmount,
                ),
              )}
            </div>
          </>
        ),
      },
      {
        header: "comments",
        accessorKey: "comments",
        enableColumnFilter: false,
      },
    ],
    [],
  );

  console.log(startDate, endDate);

  React.useEffect(() => {
    void dispatch(
      getCashierAnalysis({
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
          <BreadCrumb title="Cashier Analysis" pageTitle="Dashboards" />
          <Row>
            <Col md={12}>
              <Card className="card-animate">
                <CardBody>
                  <div>
                    <TableContainer
                      columns={columns}
                      data={cashierAnalysis || []}
                      isCustomFilter={true}
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

export default CashierAnalysis;
