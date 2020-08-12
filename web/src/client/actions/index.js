const filtersChanged = (newValue) => {
  return {
    type: 'FILTERS_CHANGED',
    payload: newValue
  };
};

const filtersChangedSearch = (newValue) => {
  return {
    type: 'FILTERS_CHANGED_ONLY_SEARCH',
    searchPayload: newValue
  };
};

const filtersChangedFilterBar = (newValue) => {
  return {
    type: 'FILTERS_CHANGED_ONLY_FILTER_BAR',
    filterBarPayload: newValue
  };
};

const filtersChangedTableHead = (newValue) => {
  return {
    type: 'FILTERS_CHANGED_ONLY_TABLE_HEAD',
    tableHeadPayload: newValue
  };
};


const snippetsLoaded = (snippets) => {
  return {
    type: 'FETCH_SNIPPETS_SUCCESS',
    payload: snippets
  };
};

const newSnippetsLoaded = (newSnippets) => {
  return {
    type: 'FETCH_NEW_SNIPPETS_SUCCESS',
    payload: newSnippets
  };
};

const snippetsLoading = () => {
  return {
    type: 'FETCH_SNIPPETS_REQUEST',
  };
};


const filtersReset = () => {
  return {
    type: 'FILTERS_RESET'
  };
};

const reportsLoaded = (reports) => {
  return {
    type: 'FETCH_REPORTS_SUCCESS',
    payload: reports
  };
};

const reportsLoading = () => {
  return {
    type: 'FETCH_REPORTS_REQUEST',
  };
};

const newReportAdded = (reports) => {
  return {
    type: 'REPORT_ADD',
    payload: reports
  };
};

const reportDeleted = (index) => {
  return {
    type: 'REPORT_DEL',
    index: index
  };
};

const newPeriodsList = (periods) => {
  return {
    type: 'FETCH_PERIODS_SUCCESS',
    payload: periods
  };
};

const changeCurrentPage = ( name ) => {
  return {
    type : 'CHANGE_CURRENT_PAGE',
    name : name,
  };
}
const changeCurrentFilterIcon = ( name ) => {
  return {
    type : 'CHANGE_CURRENT_FILTER_ICON',
    name : name,
  };
}

const clickCancel = (  ) => {
  return {
    type : 'CLICK_ON_BUTTON_CANCEL',
  }
}


export {
  filtersChanged,
  snippetsLoaded,
  newSnippetsLoaded,
  snippetsLoading,
  filtersReset,
  reportsLoaded,
  reportsLoading,
  newReportAdded,
  reportDeleted,
  newPeriodsList,
  changeCurrentPage,
  changeCurrentFilterIcon,
  filtersChangedSearch,
  filtersChangedFilterBar,
  filtersChangedTableHead,
  clickCancel
};
