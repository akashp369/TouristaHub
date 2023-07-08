import axios from 'axios'

const signupAction=(user)=>(dispatch)=>{
    axios.post('https://alert-puce-swallow.cyclic.app/signup', user)
      .then((response) => {
        console.log(response)
        dispatch({ type: "Signup" });
      })
      .catch((error) => {
        console.log(error)
      });
      
}

const loginAction=(data)=>(dispatch)=>{
  axios.post('https://alert-puce-swallow.cyclic.app/login', data)
  .then((response) => {
    console.log(response)
    if(response.data.token){
      localStorage.setItem("token", JSON.stringify(response.data.token))
      dispatch({ type: "Login", token:response.data.token});
    }else{
      dispatch({type:"loginfailed"})
    }
  })
  .catch((error) => {
    console.log(error)
  });
}

export  {signupAction, loginAction}