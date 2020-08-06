import statistics from "../components/pages/statistics"

export default (state,action) =>
{
    if ( state === undefined) {
        return({
          page : 'statistics',
          filterIcon : 'open',
          cancel : false,
        })
    }

    switch(action.type){
        case ('CHANGE_CURRENT_FILTER_ICON') : {
            return({ ...state.optional,
                filterIcon : action.name,
            })
        }
        case ('CHANGE_CURRENT_PAGE') : {
            return ( {...state.optional,
                page : action.name,
            })
        }
        case ('CLICK_ON_BUTTON_CANCEL') : {
            return{
                ...state.optional,
                cancel : !state.optional.cancel
            }
        }
        default : {
            return( 
                state.optional)
        }
    } 


}