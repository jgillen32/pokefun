import React, { useState } from 'react';
import { Router } from "@reach/router"
import initData from "../../resources/initialData";
import Home from '../Home/';
import Detail from "../Detail/";

const App = () => {
  const [data] = useState(initData);

  return (
    <Router>
      <Home data={data} path="/" />
      <Detail path="/pokemon/:id" />
    </Router>
  );
}

export default App;
