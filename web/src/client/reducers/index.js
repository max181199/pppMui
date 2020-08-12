import updateFilters from './filters';
import updateSnippets from './snippets';
import updateReports from './reports';
import optionalData from './optionals';
import updatePeriods from './periods';

const reducer = (state, action) => {
  return {
    filters: updateFilters(state, action),
    snippets: updateSnippets(state, action),
    reports: updateReports(state, action),
    periods : updatePeriods(state , action),
    optional : optionalData(state,action),
  };
};

export default reducer;
