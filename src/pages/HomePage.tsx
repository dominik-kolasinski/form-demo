import React from "react";
import { withRouter } from "react-router";

import Form from "../components/Form";
import "./pages.scss";

const HomePage: React.FC = () => (
  <main className="p-home">
    <Form />
  </main>
);

export default withRouter(HomePage);
