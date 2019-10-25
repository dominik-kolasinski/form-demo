import React from "react";

const PrintJson = React.memo(({ data }) => (
  <div className="json-output">
    <pre style={{ textAlign: "left" }}>
      field values:
      <br />
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
));

export default PrintJson;
