import { createSlice } from "@reduxjs/toolkit";
import {
  // getAllData,
  // getAudiencesMetricsChartsData,
  // getUserDeviceChartsData,
  // getAudiencesSessionsChartsData,
  //
  getDashboardAnalytics,
} from "./thunk";

export const initialState: any = {
  chartData: [],
  audiencesMetricsData: [],
  userDeviceData: [],
  audiencesSessionsData: [],
  // error: {},
  //
  branches: "",
  range: "",
  startDate: new Intl.DateTimeFormat("en-GB").format(new Date()),
  endDate: new Intl.DateTimeFormat("en-GB").format(new Date()),
  error: "",
  isLoading: false,
  salesByBranch: [],
  salesBySalesMan: [],
  salesByUser: [],
  salesByCustomer: [],
  salesByProfitSummary: {},
  salesByTypeProfit: [],
  salesByTypeProfitByMonth: [],
  salesByCashbook: [],
  branchSalesSeries: [],
  branchCategories: [],
  personCategories: [],
  personData: [],
  branchData: [],
  userCategories: [],
  userData: [],
  cusCategories: [],
  cusData: [],
};

const DashboardAnalyticsSlice = createSlice({
  name: "DashboardAnalytics",
  initialState,
  reducers: {
    addAnalysisFilter(state, action) {
      console.log(action.payload);
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      // state.branches = "";
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getAllData.fulfilled, (state, action) => {
    //   state.chartData = action.payload;
    // });
    // builder.addCase(getAllData.rejected, (state, action: any) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(
    //   getAudiencesMetricsChartsData.fulfilled,
    //   (state, action) => {
    //     state.audiencesMetricsData = action.payload;
    //   },
    // );
    // builder.addCase(
    //   getAudiencesMetricsChartsData.rejected,
    //   (state, action: any) => {
    //     state.error = action.payload.error || null;
    //   },
    // );

    // builder.addCase(getUserDeviceChartsData.fulfilled, (state, action: any) => {
    //   state.userDeviceData = action.payload;
    // });
    // builder.addCase(getUserDeviceChartsData.rejected, (state, action: any) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(
    //   getAudiencesSessionsChartsData.fulfilled,
    //   (state, action: any) => {
    //     state.audiencesSessionsData = action.payload;
    //   },
    // );
    // builder.addCase(
    //   getAudiencesSessionsChartsData.rejected,
    //   (state, action: any) => {
    //     state.error = action.payload.error || null;
    //   },
    // );
    //
    builder.addCase(getDashboardAnalytics.pending, (state, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(getDashboardAnalytics.fulfilled, (state, action: any) => {
      console.log(action.payload);
      let branchData: any = [];
      let branchCategories: any = [];
      let personData: any = [];
      let personCategories: any = [];
      let userData: any = [];
      let userCategories: any = [];
      let cusData: any = [];
      let cusCategories: any = [];

      if (action.payload.salesByBranch[0]?.table !== undefined) {
        action.payload.salesByBranch[0]?.table.forEach((obj: any) => {
          branchData.push(parseInt(obj.totalsales));
          branchCategories.push(obj.salesbranch);
        });
      }

      if (action.payload.salesBySalesMan[0]?.table !== undefined) {
        action.payload.salesBySalesMan[0]?.table.forEach((obj: any) => {
          personData.push(parseInt(obj.salesman));
          personCategories.push(obj.salesman);
        });
      }

      if (action.payload.salesByUser[0]?.table !== undefined) {
        action.payload.salesByUser[0]?.table.forEach((obj: any) => {
          userData.push(parseInt(obj.totalsales));
          userCategories.push(obj.docuser);
        });
      }

      if (action.payload.salesByTypeProfitByMonth[0]?.table !== undefined) {
        action.payload.salesByTypeProfitByMonth[0]?.table
          // .sort((a, b) => (a.theMonth > b.theMonth ? 1 : -1))
          .sort((a: any, b: any) => a.theMonth - b.theMonth)
          .forEach((obj: any) => {
            cusData.push(parseFloat(obj.totalsales).toFixed(2).trim());
            let month = "";
            switch (obj.theMonth) {
              case 1:
                month = "January";
                break;
              case 2:
                month = "February";
                break;
              case 3:
                month = "March";
                break;
              case 4:
                month = "April";
                break;
              case 5:
                month = "May";
                break;
              case 6:
                month = "June";
                break;
              case 7:
                month = "July";
                break;
              case 8:
                month = "August";
                break;
              case 9:
                month = "September";
                break;
              case 10:
                month = "October";
                break;
              case 11:
                month = "November";
                break;
              case 12:
                month = "December";
                break;
              default:
                break;
            }
            cusCategories.push(month);
          });
      }

      state.isLoading = false;
      state.salesByProfitSummary =
        action.payload.salesByProfitSummary[0]?.table[0] ?? {};
      state.salesByTypeProfit =
        action.payload.salesByTypeProfit[0]?.table ?? [];
      state.branchSalesSeries = [
        {
          name: "Total Sales",
          data: [...branchData],
        },
      ];
      state.branchCategories = branchCategories ?? [];
      state.branchData = branchData ?? [];
      state.personCategories = personCategories ?? [];
      state.personData = personData ?? [];
      state.userCategories = userCategories ?? [];
      state.userData = userData ?? [];
      state.cusCategories = cusCategories ?? [];
      state.cusData = cusData ?? [];
    });
    builder.addCase(getDashboardAnalytics.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const { addAnalysisFilter } = DashboardAnalyticsSlice.actions;

export default DashboardAnalyticsSlice.reducer;
