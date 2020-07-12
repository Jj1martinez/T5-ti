import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Terms from './components/Terms';
import Search from './components/Search';



function App() {
  return (
    <div className="App">
      <div className="App-intro">
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route exact path="/about/" component={About}/> 
            <Route exact path="/terms/" component={Terms}/> 
            <Route exact path="/search" component={Search}/> 
            <Redirect to="/" />
          </Switch>
        </div>
    </div>
  );
}

export default App;
