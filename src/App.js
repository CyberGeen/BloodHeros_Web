import React  from 'react'
//higher functional imports
import {Route , Switch , Redirect } from 'react-router-dom'
//component imports
import NavBar from './component/navBar/NavBar'
import Test from "./component/Test";
import { Home } from './component/home/Home';
//User folder imports
import Login from './component/user/Login';
import SignUp from './component/user/SignUp';
import CreatePost from './component/post/CreatePost';
import { CommentPost } from './component/post/CommentPost';
import LogOut from './component/user/LogOut';

//services
import {getUser} from './services/httpService'



function App() {
  const user = getUser()
  console.log(user)
  return (
    <>
      <NavBar user={user} />
      <Switch>
        <Route path="/lol" component={Test} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/create" component={CreatePost} />
        <Route path="/comment" component={CommentPost} />
        <Route path="/logout" component={LogOut}  />
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
      {/* {
        !user && 
        <div>user not logged in</div>
      }
      {
        user &&
        <div>user is logged in </div>
      } */}
    </>
  );
}

export default App;
