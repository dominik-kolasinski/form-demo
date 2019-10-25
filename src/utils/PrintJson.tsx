import React from "react";

interface PrintJsonProps {
  data: object;
}

const PrintJson: React.FC<PrintJsonProps> = React.memo(props => (
  <div className="json-output">
    <pre style={{ textAlign: "left" }}>
      field values:
      <br />
      {JSON.stringify(props.data, null, 2)}
    </pre>
  </div>
));

export default PrintJson;
