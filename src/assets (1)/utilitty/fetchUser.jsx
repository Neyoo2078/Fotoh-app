
export const fetchUser = ()=>{  const User =localStorage.getItem("user") !== undefined? JSON.parse(localStorage.getItem("user")) :localStorage.clear()
return User;}