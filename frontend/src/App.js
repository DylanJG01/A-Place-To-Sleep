import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/Spots'
import SingleSpot from './components/SingleSpot'
import UserSpots from './components/UserSpots'
import AddSpotForm  from "./components/AddSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import UserReviews from "./components/GetUserReviews";

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
          <Route exact path="/reviews/current">
            < UserReviews />
          </Route>
          <Route exact path={'/spots/current'}>
            <UserSpots />
          </Route>
          <Route exact path={'/spots/new'}>
            <AddSpotForm />
          </Route>
          <Route exact path={'/spots/:spotId/edit'}>
            <EditSpotForm />
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