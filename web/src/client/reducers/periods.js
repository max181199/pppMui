const updatePeriods = (state, action) => {

    if (state === undefined) {
        return {
            periods : [
                'Текущий'
            ]
        }
      }

    switch (action.type) {

        case 'FETCH_PERIODS_SUCCESS' :
            return {
                ...state.periods,
                periods : action.payload,
            }

        default:
            return state.periods;
    }

}

export default updatePeriods