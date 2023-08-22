import React from "react";
import { Helmet } from "react-helmet";

const ReactHelmet = ({title}) => {
  return (
    <Helmet>
      <title>{title} | Tool</title>
    </Helmet>
  );
};

export default ReactHelmet;
