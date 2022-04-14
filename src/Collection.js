import './App.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';


function Collection(props) {

  return (
    <div className="App">
        <h1>{props.address}</h1>
    </div>
  );
}

export default Collection;
