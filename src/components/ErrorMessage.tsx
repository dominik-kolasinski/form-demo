import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = props => (
  <span className="error-message">{props.message}</span>
);

export default ErrorMessage;
