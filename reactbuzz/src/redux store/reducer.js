const initialState={
    isError:false,
    isAuth:false,
    isSignup:false,
    token:'',
    emp:'',
}

const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case "Signup":
            return {...state, isError: false, isAuth:false, isSignup:true}
        case "Login":
            return{...state, isAuth:true, token:action.token}
        case "loginfailed":
            return{...state, isAuth:false, token:""}
        default:
            return state
    }
}

export default reducer