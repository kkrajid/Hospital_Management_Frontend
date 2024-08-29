const initialState = {
    filed_type: ""
}

const adminDashSelectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_DASHBOARD":
            return {
                ...state,
                filed_type: action.filed_type 
            }
        default:
            return state
    }
}

export default adminDashSelectionReducer
