import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Form from './../src/components/form';
import Raffle from './../src/components/raffle';
import {App} from './App'
import { createBrowserHistory } from 'history'
const history= createBrowserHistory();

const Routing = () => (
    <Router history={history}>
  
        <Route exact path="/" component={App}/>
        <Route path="/raffle/:id" component={Raffle}/>
        <Route path="/register" component={Form}/>

        {/* <Route path="/git" component={Git}/> */}
      
    </Router>
  )
  export default Routing