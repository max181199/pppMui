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

        case 'DROP_PHOTOS' : {
            return { 
                photos : []
            }
        }
        
        default:
            return state;
    }


}

export default reducer