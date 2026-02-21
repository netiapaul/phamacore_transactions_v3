import React, { useMemo } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { AnalysisFilters } from "./analytics_filters";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { useAppDispatch, useAppSelector } from "store";
import { getStockAnalysis } from "../../slices/dashboardAnalytics/thunk";
import { numberFormatter } from "../../helpers/functions";

const StockAnalysis = () => {
  const dispatch = useAppDispatch();

  const { branches, startDate, endDate, isLoading, stockAnalysis } =
    useAppSelector((state) => state.DashboardAnalytics);

  const columns = useMemo(
    () => [
      {
        header: "ItemCode",
        accessorKey: "itmcode",
        enableColumnFilter: false,
      },
      {
        header: "Barcode",
        accessorKey: "barcode",
        enableColumnFilter: false,
      },
      {
        header: "ItemName",
        accessorKey: "itmname",
        enableColumnFilter: false,
      },
      {
        header: "OpenStock",
        accessorKey: "openstock",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "PurchaseQTY",
        accessorKey: "purchaseQTY",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "PurchaseVal",
        accessorKey: "purchaseVal",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "SalesQty",
        accessorKey: "salesqty",
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
        header: "TransferQty",
        accessorKey: "transferQTY",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "AdjustmentQty",
        accessorKey: "adjustmentQTY",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "ReceivedQty",
        accessorKey: "receivedQTY",
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
        header: "PercProfit",
        accessorKey: "percprofit",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "TotalSalesPerc",
        accessorKey: "totalsalesperc",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "ClosingStock",
        accessorKey: "closestock",
        enableColumnFilter: false,
        cell: ({ getValue }: { getValue: any }) =>
          numberFormatter.format(Number(getValue())),
      },
      {
        header: "BranchName",
        accessorKey: "brancH_NAME",
        enableColumnFilter: false,
      },
    ],
    [],
  );

  React.useEffect(() => {
    void dispatch(
      getStockAnalysis({
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
                      data={stockAnalysis || []}
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

export default StockAnalysis;
