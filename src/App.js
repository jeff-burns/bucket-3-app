import React from "react";
import "./App.css";

import Header from "./Components/Header";
import Instructions from "./Components/Instructions";
import RouteTimesForm from "./Components/RouteTimesForm";
// import WeatherResults from "./Components/WeatherResults";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Instructions />
        <RouteTimesForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
