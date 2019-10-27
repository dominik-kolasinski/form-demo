import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useState, dispatch } from "../store/reducer";
import ResultsList from "../components/results-list/ResultsList";
import "./pages.scss";
import "../styles/common.scss";

const ResultsPage: React.FC = (props: any) => {
  const storedState = useState((state: any) => state.submittedFormData);
  const resetSubmittedForm = () => {
    props.history.push({
      pathname: "/"
    });
    dispatch({ type: "eraseSubmittedFormData" });
  };

  return (
    <main className="p-results">
      <div className="paper p-results-content">
        {storedState !== undefined ? (
          <>
            <p className="p-results-message">
              The form has been successfully submitted!
            </p>
            <ResultsList results={storedState} />
            <button className="u-link-button" onClick={resetSubmittedForm}>
              <Link to="/">Remove this form data and go to homepage</Link>
            </button>
          </>
        ) : (
          <>
            <p className="p-results-message">
              There is no submitted form at the moment - to submit form go to
              home page.
            </p>
            <button className="u-link-button">
              <Link to="/">go to homepage</Link>
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default withRouter(ResultsPage);
