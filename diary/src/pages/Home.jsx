import React from 'react';
import {useSearchParams} from "react-router-dom";

function Home() {
  const [parmas, setParmas] = useSearchParams();
  console.log(parmas.get("value"));

  return (
    <div></div>
  );
}

export default Home;