import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactBar from './components/ContactBar/ContactBar.jsx';
import NavigationBar from './components/NavigationBar/NavigationBar.jsx';
import AerialView from './components/AerialView/AerialView.jsx';
import HouseStyleReview from './components/HouseStyleReview/HouseStyleReview.jsx';
import Traffic from './components/Traffic/Traffic.jsx';
import SampleRoom from './components/SampleRoom/SampleRoom.jsx';
import DigitalBook from './components/DigitalBook/DigitalBook.jsx';
import More from './components/More/More.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route render={({ location }) => (
          <div className="mainRouteContainer">
          <ContactBar></ContactBar>
          <NavigationBar></NavigationBar>
            <TransitionGroup className="transitionGroup">
              <CSSTransition
                key={location.key}
                in={true}
                timeout={{ enter: 1400, exit: 1400 }}
                classNames={"componentChangeCSSTransition"}
              >
                <Switch location={location}>
                  {/*<Route path="/" exact component={}></Route>*/}
                  <Route path="/james/qiuli-project/" exact component={AerialView}></Route>
                  <Route path="/james/qiuli-project/AerialView" exact component={AerialView}></Route>
                  <Route path="/james/qiuli-project/HouseStyleReview" exact component={HouseStyleReview}></Route>
                  <Route path="/james/qiuli-project/Traffic" exact component={Traffic}></Route>
                  <Route path="/james/qiuli-project/SampleRoom" exact component={SampleRoom}></Route>
                  <Route path="/james/qiuli-project/DigitalBook" exact component={DigitalBook}></Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        )}>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
