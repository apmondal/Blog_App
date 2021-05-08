import './App.scss';
import { Route, Switch } from "react-router-dom"
import Register from './pages/registerpage/Register';
import Login from './pages/loginpage/Login';
import Home from './pages/homepage/Home';
import Profile from './pages/profile/Profile';
import Article from './pages/articlepage/Article';
import InputArticle from './pages/inputarticlepage/InputArticle';
import Error from './components/error/Error';

function App() {
  return (
    <>
      <Switch>
        <Route exact path = "/" render = {() => <Home />} />
        <Route exact path = "/login" render = {() => <Login />} />
        <Route exact path = "/register" render = {() => <Register />} />
        <Route exact path = "/profile/:username" render = {() => <Profile />} />
        <Route exact path = "/article/:slug" render = {() => <Article />} />
        <Route exact path = "/inputArticle" render = {() => <InputArticle />} />
        <Route exact path = "/error" render = {() => <Error />} />
      </Switch>
    </>
  );
}

export default App;
