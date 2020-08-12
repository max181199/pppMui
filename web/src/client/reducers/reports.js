const updateReports = (state, action) => {

  if (state === undefined) {
    return {
      reports: [],
      loadingReports: false
    };
  }

  switch (action.type) {

    case 'FETCH_REPORTS_SUCCESS':
      return {
        ...state.reports,
        reports: action.payload,
        loadingReports: false
      };

    case 'REPORT_ADD':
      return {
        ...state.reports,
        reports: [...state.reports.reports, ...action.payload]
      };

    case 'REPORT_DEL':
      return {
        ...state.reports,
        reports: state.reports.reports.slice(0, action.index).concat(state.reports.reports.slice(action.index + 1))
      };

    case 'FETCH_REPORTS_REQUEST':
      return {
        ...state.reports,
        loadingReports: true
      };

    default:
      return state.reports;
  }
};

export default updateReports;
