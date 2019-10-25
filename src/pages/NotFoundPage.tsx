import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./pages.scss";

const NotFoundPage: React.FC = () => (
  <main className="p-not-found">
    <div className="paper not-found-content">
      <span className="not-found-message">Page not found...</span>
      <button className="link-button">
        <Link to="/">go to homepage</Link>
      </button>
    </div>
  </main>
);

export default withRouter(NotFoundPage);
