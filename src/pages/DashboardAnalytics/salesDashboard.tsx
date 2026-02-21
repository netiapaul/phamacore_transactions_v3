import BreadCrumb from "../../Components/Common/BreadCrumb";
import React, { useState } from "react";
import { getDashboardAnalytics } from "../../slices/dashboardAnalytics/thunk";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";
import { AnalysisFilters } from "./analytics_filters";
import { useAppDispatch, useAppSelector } from "store";
import Chart from "react-apexcharts";
import ReactEcharts from "echarts-for-react";

const SalesAnalysis = () => {
  const dispatch = useAppDispatch();

  const {
    branches,
    startDate,
    endDate,
    isLoading,
    salesByProfitSummary,
    salesByTypeProfit,
    branchData,
    branchCategories,
    branchSalesSeries,
    personCategories,
    personData,
    userCategories,
    userData,
    cusCategories,
    cusData,
  } = useAppSelector((state) => state.DashboardAnalytics);

  const [salesBy, setSalesBy] = useState<string>("Sales Persons");

  //   const handleSubmit = async (e: React.SyntheticEvent) => {
  //     e.preventDefault();
  //     // dispatch dashboard analytics thunk (can pass filter payload if needed)
  //     void dispatch(
  //       getDashboardAnalytics({
  //         startDate: "01/01/2026",
  //         endDate: "28/02/2026",
  //         bcodes: "",
  //       }),
  //     );
  //     // const results = await dispatch(
  //     //   getDashboardAnalytics({
  //     //     startDate: "01/01/2026",
  //     //     endDate: "28/02/2026",
  //     //     bcodes: "",
  //     //   }),
  //     // );
  //     // if (getDashboardAnalytics.fulfilled.match(results)) {
  //     //   console.log(results);
  //     // }
  //   };
  let totalsales = salesByProfitSummary?.totalsales ?? 0;
  let totalprofit = salesByProfitSummary?.totalprofit ?? 0;
  let percprofit = salesByProfitSummary?.percprofit ?? 0;
  let avgsale = salesByProfitSummary?.avgsale ?? 0;
  let docscount = salesByProfitSummary?.docscount ?? 0;

  React.useEffect(() => {
    void dispatch(
      getDashboardAnalytics({
        //   startDate: new Intl.DateTimeFormat("en-GB").format(new Date(startDate)),
        //   endDate: new Intl.DateTimeFormat("en-GB").format(new Date(endDate)),
        startDate: startDate,
        endDate: endDate,
        bcodes: "",
      }),
    );
  }, [dispatch, branches, startDate, endDate]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Sales Dashboard" pageTitle="Dashboards" />

          <AnalysisFilters title="Sales Dashboard" />

          <Row>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Total Sales
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="fs-6 mb-0 text-success">
                        Docs Count {docscount}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div className="flex-fill">
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span className="counter-value" data-target="559.25">
                          <CountUp
                            start={0}
                            prefix={""}
                            suffix={""}
                            separator={","}
                            end={totalsales}
                            decimals={2}
                            duration={4}
                          />
                        </span>
                      </h4>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" className="p-0">
                              Sale Type
                            </th>
                            <th scope="col" className="p-0">
                              Sales
                            </th>
                            <th scope="col" className="p-0">
                              TXC
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesByTypeProfit.map((type: any, key: number) => {
                            return (
                              <tr key={key}>
                                <td className="p-0">{type.saletype}</td>
                                <td className="p-0">
                                  {new Intl.NumberFormat("en-GB").format(
                                    parseFloat(type?.totalsales),
                                  )}
                                </td>
                                <td className="p-0">
                                  {new Intl.NumberFormat("en-GB").format(
                                    parseFloat(type?.docscount),
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Total Profit
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="fs-6 mb-0 text-success">
                        Docs Count {docscount}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div className="flex-fill">
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span className="counter-value" data-target="559.25">
                          <CountUp
                            start={0}
                            prefix={""}
                            suffix={""}
                            separator={","}
                            end={totalprofit}
                            decimals={2}
                            duration={4}
                          />
                        </span>
                      </h4>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" className="p-0">
                              Sale Type
                            </th>
                            <th scope="col" className="p-0">
                              Profit
                            </th>
                            <th scope="col" className="p-0">
                              %
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesByTypeProfit.map((type: any, key: number) => {
                            return (
                              <tr key={key}>
                                <td className="p-0">{type.saletype}</td>
                                <td className="p-0">
                                  {new Intl.NumberFormat("en-GB").format(
                                    parseFloat(type?.totalprofit),
                                  )}
                                </td>
                                <td className="p-0">
                                  {new Intl.NumberFormat("en-GB").format(
                                    parseFloat(type?.percprofit),
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Perc Profit
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="fs-6 mb-0 text-success">
                        Docs Count {docscount}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div className="flex-fill">
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span className="counter-value" data-target="559.25">
                          <CountUp
                            start={0}
                            prefix={""}
                            suffix={" %"}
                            separator={","}
                            end={percprofit}
                            decimals={2}
                            duration={4}
                          />
                        </span>
                      </h4>

                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" className="p-0">
                              Sale Type
                            </th>
                            <th scope="col" className="p-0">
                              % of Profit
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesByTypeProfit.map((type: any, key: number) => {
                            return (
                              <tr key={key}>
                                <td className="p-0">{type.saletype}</td>
                                <td className="p-0">
                                  {new Intl.NumberFormat("en-GB").format(
                                    parseFloat(type?.percofprofit),
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Avg Sales
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="fs-6 mb-0 text-success">
                        Docs Count {docscount}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div className="flex-fill">
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span className="counter-value" data-target="559.25">
                          <CountUp
                            start={0}
                            prefix={""}
                            suffix={""}
                            separator={","}
                            end={avgsale}
                            decimals={2}
                            duration={4}
                          />
                        </span>
                      </h4>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" className="p-0">
                              Sale Type
                            </th>
                            <th scope="col" className="p-0">
                              AVG Sales
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesByTypeProfit.map((type: any, key: number) => {
                            return (
                              <tr key={key}>
                                <td className="p-0">{type.saletype}</td>
                                <td className="p-0">
                                  {new Intl.NumberFormat("en-GB").format(
                                    parseFloat(type?.avgsale),
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card className="card-animate h-100">
                <CardHeader className="p-2">Sales by Branches</CardHeader>
                <CardBody>
                  <Chart
                    options={{
                      series: [
                        {
                          data: [...branchData],
                        },
                      ],
                      chart: {
                        type: "bar",
                        height: 350,
                      },
                      tooltip: {
                        y: {
                          formatter: function (value: any) {
                            return value
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          },
                        },
                      },
                      plotOptions: {
                        bar: {
                          horizontal: true,
                          dataLabels: {
                            position: "top",
                          },
                          reversed: true,
                        },
                        dataLabels: {
                          enabled: true,
                          style: {
                            colors: ["#fff"],
                          },
                          offsetX: 30,
                        },
                      },
                      dataLabels: {
                        enabled: true,
                        textAnchor: "start",
                        style: {
                          colors: ["#47404f"],
                          fontSize: "12px",
                        },
                        formatter: function (val: any, opt: any) {
                          return val
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        },
                        offsetX: 30,
                      },
                      xaxis: {
                        categories: [...branchCategories],
                      },
                    }}
                    series={branchSalesSeries}
                    type="bar"
                    height={350}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="card-animate h-100">
                <CardHeader className="p-2">
                  <div className="d-flex justify-content-between gap-3">
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="clientType"
                        id="desktop"
                        value={salesBy}
                        checked={salesBy === "Users"}
                        onChange={() => setSalesBy("Users")}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="desktop"
                      >
                        Sales by Sales Users
                      </label>
                    </span>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="clientType"
                        id="desktop"
                        value={salesBy}
                        checked={salesBy === "Sales Persons"}
                        onChange={() => setSalesBy("Sales Persons")}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="desktop"
                      >
                        Sales by Sales Persons
                      </label>
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  {salesBy === "Sales Persons" ? (
                    <Chart
                      options={{
                        labels: personCategories,
                        dataLabels: {
                          formatter: function (val: any, opts: any) {
                            return opts.w.config.series[opts.seriesIndex]
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          },
                        },
                        tooltip: {
                          y: {
                            formatter: function (value: any) {
                              return value
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                          },
                        },
                        responsive: [
                          {
                            options: {
                              legend: {
                                position: "bottom",
                              },
                            },
                          },
                        ],
                        legend: {
                          horizontalAlign: "right",
                        },
                      }}
                      series={[...personData]}
                      type="pie"
                      height={350}
                    />
                  ) : (
                    <Chart
                      options={{
                        labels: userCategories,
                        dataLabels: {
                          formatter: function (val: any, opts: any) {
                            return opts.w.config.series[opts.seriesIndex]
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          },
                        },
                        tooltip: {
                          y: {
                            formatter: function (value: any) {
                              return value
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                          },
                        },
                        responsive: [
                          {
                            options: {
                              legend: {
                                position: "bottom",
                              },
                            },
                          },
                        ],
                        legend: {
                          horizontalAlign: "right",
                        },
                      }}
                      series={[...userData]}
                      type="pie"
                      height={350}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card className="card-animate h-100">
                <CardHeader className="p-2">Sales by Customer</CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="card-animate h-100">
                <CardHeader className="p-2">Monthly Sales</CardHeader>
                <CardBody>
                  <ReactEcharts
                    option={{
                      // color: ['#ff0000', '#00ff00', '#0000ff', '#c58c4f'], // Red, Green, Blue
                      color: ["#2962ff"],
                      tooltip: {
                        trigger: "axis",
                        axisPointer: {
                          type: "shadow",
                        },
                      },
                      grid: {
                        top: "5%",
                        left: "5",
                        right: "0",
                        bottom: "1",
                        containLabel: true,
                      },
                      xAxis: [
                        {
                          type: "category",
                          data: [...cusCategories],
                          axisTick: {
                            alignWithLabel: true,
                          },
                          axisLine: {
                            onZero: false,
                            lineStyle: {
                              color: "#797979",
                              type: "solid",
                              width: "1",
                              shadowColor: "rgba(0,0,0,0)",
                              shadowBlur: 5,
                              shadowOffsetX: 3,
                              shadowOffsetY: 3,
                            },
                          },
                        },
                      ],
                      yAxis: [
                        {
                          type: "value",
                          axisLabel: {
                            formatter: "{value}",
                          },
                          axisLine: {
                            show: true,
                            onZero: false,
                            lineStyle: {
                              color: "#797979",
                              type: "solid",
                            },
                          },
                        },
                      ],
                      series: [
                        {
                          name: "Month Total",
                          type: "bar",
                          // barWidth: '50%',
                          data: [...cusData],
                          // data: formattedData([...cusData]),
                        },
                      ],
                    }}
                    style={{ height: "450px", width: "100%" }}
                    notMerge={true}
                    lazyUpdate={true}
                    opts={{ renderer: "svg" }}
                    showLoading={isLoading}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SalesAnalysis;
