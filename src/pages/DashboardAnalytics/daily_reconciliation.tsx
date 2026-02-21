import React, { useMemo } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { useAppDispatch, useAppSelector } from "store";
import { getDailyReconciliation } from "../../slices/dashboardAnalytics/thunk";
import { numberFormatter, dateFormatter } from "../../helpers/functions";

const DailyReconciliation = () => {
  const dispatch = useAppDispatch();

  const { branches, startDate, endDate, isLoading, dailyReconciliation } =
    useAppSelector((state) => state.DashboardAnalytics);

  const columns = useMemo(
    () => [
      {
        header: "Branch",
        accessorKey: "branchName",
        enableColumnFilter: false,
      },
      {
        header: "CreditSales",
        accessorKey: "creditSales",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "CashInvoice",
        accessorKey: "cashInvoice",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "CopaySales",
        accessorKey: "copaySales",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalSales",
        accessorKey: "totalSales",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "CreditNotes",
        accessorKey: "creditNotes",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "NetSales",
        accessorKey: "netSales",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Cheque",
        accessorKey: "chequeCollections",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "EasyPay",
        accessorKey: "easyPay",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Mpesa",
        accessorKey: "mpesa",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Visa",
        accessorKey: "visa",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Cash",
        accessorKey: "cash",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Others",
        accessorKey: "otherModes",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "Payments",
        accessorKey: "payments",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalCollections",
        accessorKey: "totalModes",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "UncollectedCashSale",
        accessorKey: "uncollectedCashSale",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "OverPayment",
        accessorKey: "overPaymentCashSale",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "%SalesCollected",
        accessorKey: "percentageSalesCollected",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
    ],
    [],
  );

  React.useEffect(() => {
    void dispatch(
      getDailyReconciliation({
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
          <BreadCrumb title="Daily Reconciliation" pageTitle="Dashboards" />
          <Row>
            <Col md={12}>
              <Card className="card-animate">
                <CardBody>
                  <div>
                    <TableContainer
                      columns={columns}
                      data={dailyReconciliation || []}
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

export default DailyReconciliation;
