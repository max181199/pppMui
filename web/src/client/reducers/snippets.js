const updateSnippets = (state, action) => {

  if (state === undefined) {
    return {
      snippets: [],
      loadingSnippets: true
    };
  }

  switch (action.type) {

    case 'FETCH_SNIPPETS_SUCCESS':
      return {
        ...state.snippets,
        snippets: action.payload,
        loadingSnippets: false
      };

    case 'FETCH_NEW_SNIPPETS_SUCCESS':
      return {
        ...state.snippets,
        snippets: [...state.snippets.snippets, ...action.payload],
        loadingSnippets: false
      };

    case 'FETCH_SNIPPETS_REQUEST':
      return {
        ...state.snippets,
        loadingSnippets: true
      };

    default:
      return state.snippets;
  }
};

export default updateSnippets;
