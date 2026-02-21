import React, { useMemo } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { useAppDispatch, useAppSelector } from "store";
import { getInventoryListing } from "../../slices/stocksInventory/thunk";

const InventorySetups = () => {
  const dispatch = useAppDispatch();

  const { inventoryItems } = useAppSelector((state) => state.StockInventory);

  const columns = useMemo(
    () => [
      {
        header: "ItemCode",
        accessorKey: "inV_CODE",
        enableColumnFilter: false,
      },
      {
        header: "Barcode",
        accessorKey: "thebarcode",
        enableColumnFilter: false,
      },
      {
        header: "Description",
        accessorKey: "description",
        enableColumnFilter: false,
      },
      {
        header: "Unit",
        accessorKey: "pacK_QTY",
        enableColumnFilter: false,
      },
      {
        header: "Ingredients",
        accessorKey: "activE_INGREDIENT",
        enableColumnFilter: false,
      },
      {
        header: "SubGroup",
        accessorKey: "subGroupName",
        enableColumnFilter: false,
      },
      {
        header: "Tax",
        accessorKey: "taxname",
        enableColumnFilter: false,
      },
      {
        header: "Inclusive",
        accessorKey: "inclusive",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <input
              type="checkbox"
              id="sel"
              name="sel"
              className="text-center"
              checked={cell.row.original.inclusive}
              disabled
            />
          </>
        ),
      },
      {
        header: "PriceLocked",
        accessorKey: "lockprice",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <input
              type="checkbox"
              id="sel"
              name="sel"
              className="text-center"
              checked={cell.row.original.lockprice}
              disabled
            />
          </>
        ),
      },
      {
        header: "Physical",
        accessorKey: "inV_PHYSICALITEM",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <input
              type="checkbox"
              id="sel"
              name="sel"
              className="text-center"
              checked={cell.row.original.inV_PHYSICALITEM}
              disabled
            />
          </>
        ),
      },
      {
        header: "Controlled",
        accessorKey: "contsub",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <input
              type="checkbox"
              id="sel"
              name="sel"
              className="text-center"
              checked={cell.row.original.contsub}
              disabled
            />
          </>
        ),
      },
      {
        header: "Blocked",
        accessorKey: "blocked",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <input
              type="checkbox"
              id="sel"
              name="sel"
              className="text-center"
              checked={cell.row.original.blocked}
              disabled
            />
          </>
        ),
      },
    ],
    [],
  );

  React.useEffect(() => {
    void dispatch(getInventoryListing());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Inventory Listings" pageTitle="Dashboards" />
          <Row>
            <Col md={12}>
              <Card className="card-animate">
                <CardBody>
                  <div>
                    <TableContainer
                      columns={columns}
                      data={inventoryItems || []}
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

export default InventorySetups;
