const defaultState = () => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  return {
    periodsList: [],
    base: url.searchParams.get('base') || '',
    nameArt: url.searchParams.get('nameArt') || '',
    note: url.searchParams.get('note') || '',
    from: url.searchParams.get('from') || '0',
    to: url.searchParams.get('to') || '100',
    period: url.searchParams.get('period') || 'Текущий',
    profile: url.searchParams.get('profile') || 'Все профили',
    isComparison: false,
    compPeriod: url.searchParams.get('compPeriod') || 'Не выбрано',
    compProfile: url.searchParams.get('compProfile') || 'Не выбрано',
    sortClick: url.searchParams.get('sortClick') || 'DESC',
    sortClickI: url.searchParams.get('sortClickI') || false,
    sortRefuse: url.searchParams.get('sortRefuse') || false,
    sortRefuseTime: url.searchParams.get('sortRefuseTime') || false,
    sortRdn: url.searchParams.get('sortRdn') || false,
    ms: url.searchParams.get('ms') || false,
    fix: url.searchParams.get('fix') || false,
    isDetail: url.searchParams.get('isDetail') || false,
    count: ''
  };
};

const updateFilters = (state, action) => {

  if (state === undefined) {
    return defaultState();
  }
  switch (action.type) {

    case 'FILTERS_CHANGED':
    
      return {
        ...state.filters,
        base: action.payload.base,
        nameArt: action.payload.nameArt,
        note: action.payload.note,
        from: action.payload.from === '' ? '0' : action.payload.from ,
        to: action.payload.to === '' ? '100' : action.payload.to  ,
        period: action.payload.period,
        profile: action.payload.profile,
        isComparison: (( action.payload.compPeriod !== 'Не выбрано') || (action.payload.compProfile !== 'Не выбрано')),
        compPeriod: action.payload.compPeriod,
        compProfile: action.payload.compProfile,
        sortClick: action.payload.sortClick,
        sortClickI: action.payload.sortClickI,
        sortRefuse: action.payload.sortRefuse,
        sortRefuseTime: action.payload.sortRefuseTime,
        sortRdn: action.payload.sortRdn,
        ms: action.payload.ms,
        fix: action.payload.fix,
        isDetail: action.payload.isDetail,
        count: action.payload.count
      };

      case 'FILTERS_CHANGED_ONLY_SEARCH':

        return {
          ...state.filters,
          base: action.searchPayload.base,
          nameArt: action.searchPayload.nameArt,
          note: action.searchPayload.note,
        };

        case 'FILTERS_CHANGED_ONLY_TABLE_HEAD':

          return {
            ...state.filters,
            sortClick: action.tableHeadPayload.sortClick,
            sortClickI: action.tableHeadPayload.sortClickI,
            sortRefuse: action.tableHeadPayload.sortRefuse,
            sortRefuseTime: action.tableHeadPayload.sortRefuseTime,
            sortRdn: action.tableHeadPayload.sortRdn,
            ms: action.tableHeadPayload.ms,
            fix: action.tableHeadPayload.fix,
          };  
        
        case 'FILTERS_CHANGED_ONLY_FILTER_BAR':

          return {
            ...state.filters,
            base: action.filterBarPayload.base,
            nameArt: action.filterBarPayload.nameArt,
            note: action.filterBarPayload.note,
            from: action.filterBarPayload.from === '' ? '0' : action.filterBarPayload.from ,
            to: action.filterBarPayload.to === '' ? '100' : action.filterBarPayload.to,
            period: action.filterBarPayload.period,
            profile: action.filterBarPayload.profile,
            compPeriod: action.filterBarPayload.compPeriod,
            compProfile: action.filterBarPayload.compProfile,
            isComparison: ((action.filterBarPayload.compPeriod !== 'Не выбрано') || (action.filterBarPayload.compProfile !== 'Не выбрано' ) ) 
          };   

    case 'FETCH_PERIODS_SUCCESS':
      return {
        ...state.filters,
        periodsList: action.payload
      };

    case 'FILTERS_RESET':
      return {...state.filters, ...defaultState()};

    default:
      return state.filters;
  }
};

export default updateFilters;
