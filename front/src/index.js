import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Switch, BrowserRouter as Router} from 'react-router-dom'
import Admin from './components/admin/Admin';

const router = (
  <Router>
    <Switch>
    <Route exact path="/Admin" component={Admin}/>
    <Route exact path="/" component={App}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);