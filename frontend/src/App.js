import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/Spots'
import SingleSpot from './components/SingleSpot'
import UserSpots from './components/UserSpots'
import AddSpotForm  from "./components/AddSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route path={'/spots/current'}>
            <UserSpots />
          </Route>
          <Route path={'/spots/new'}>
            <AddSpotForm />
          </Route>
          <Route path={'/spots/:spotId'}>
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;