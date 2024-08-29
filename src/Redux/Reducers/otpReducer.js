const initialState = {
    user_id: ""
}

const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OTP_VERIFICATION":
            return {
                ...state,
                user_id:action.user_id
            }
        default:
            return state
    }
}

export default otpReducer

