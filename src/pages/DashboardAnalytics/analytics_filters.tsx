import React, { useState } from "react";
import { Card, CardBody, CardHeader, Spinner } from "reactstrap";
import { addAnalysisFilter } from "../../slices/dashboardAnalytics/reducer";
import { useAppDispatch, useAppSelector } from "store";
// {
//   handleSubmit,
// }: {
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }
export const AnalysisFilters = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.DashboardAnalytics);

  const [filterObject, setFilter] = useState({
    startDate: "01/01/2026",
    endDate: "28/02/2026",
    branches: "",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(addAnalysisFilter(filterObject));
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="p-2">Filter Actions</CardHeader>
        <CardBody>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <hr />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading && (
                <Spinner size="sm" className="me-2">
                  Loading...
                </Spinner>
              )}
              Submit
            </button>
          </form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
