import React from "react";
import { objectCast } from "../../utils/objectCast";
import { capitalize } from "../../utils/capitalize";
import ErrorMessage from "../ErrorMessage";
import "./results-list.scss";

interface ResultsListProps {
  results: object;
}

const ResultsList: React.FC<ResultsListProps> = props => {
  return (
    <ul>
      {Object.keys(props.results).map(key => {
        return (
          <li key={key}>
            <span className="result-field">{capitalize(key)}:</span>
            <span className="result-value">
              {objectCast(props.results)[key]}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default ResultsList;
