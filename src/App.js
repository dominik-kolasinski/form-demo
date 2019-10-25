import React from "react";

import Form from "./components/Form";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>form-demo</h1>
      </header>
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
