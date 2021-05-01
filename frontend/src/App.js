import './App.scss';
import { Route, Switch } from "react-router-dom"
import Register from './pages/registerpage/Register';
import Login from './pages/loginpage/Login';
import Home from './pages/homepage/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path = "/" render = {() => <Home />} />
        <Route exact path = "/login" render = {() => <Login />} />
        <Route exact path = "/register" render = {() => <Register />} />
      </Switch>
    </>
  );
}

export default App;
