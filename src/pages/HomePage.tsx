import React from "react";
import { withRouter } from "react-router";

import Form from "../components/form/Form";
import "./pages.scss";

const HomePage: React.FC = () => (
  <main className="p-home">
    <div className="paper p-home-content">
      <Form />
    </div>
  </main>
);

export default withRouter(HomePage);
