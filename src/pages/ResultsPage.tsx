import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { useState, dispatch } from "../store/reducer";
import "./pages.scss";

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
      {storedState !== undefined ? (
        <h1>
          to jest result page!!! <p>{JSON.stringify(storedState)}</p>
          <button onClick={resetSubmittedForm}>
            Remove this form datat and go to homepage
          </button>
        </h1>
      ) : (
        <>
          <h1>
            There is no results from valid form - you probably typed this url
            path in address bar :/ to submit form go to homePage
          </h1>
          <Link to=""> link to home</Link>
        </>
      )}
    </main>
  );
};

export default withRouter(ResultsPage);
