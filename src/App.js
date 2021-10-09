import React  from 'react'
//higher functional imports
//component imports
import NavBar from './component/navBar/NavBar'


//services
import {getUser} from './services/httpService'



function App() {
  const user = getUser()
  console.log(user)
  return (
    <>
      <NavBar user={user} />
    </>
  );
}

export default App;
