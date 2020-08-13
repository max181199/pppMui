const reducer = (state, action) => {

    if (state === undefined){
        return {
            photos : []
        }
    }

    switch (action.type) {
        
        case 'ADD_PHOTOS' : {
            return {
               photos : [ ...state.photos , ...action.payload]
            }
        }
        
        default:
            return state;
    }


}

export default reducer