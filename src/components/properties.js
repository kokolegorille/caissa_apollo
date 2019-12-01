import React from "react";

const Properties = ({properties}) => {
  const collector = [];
  
  // format property by typeof
  const formatValue = value => {
    switch (typeof value) {
      case "boolean":
        return value ? "true" : "false"
        break;
      default:
        return value;
    }
  }
  
  // Push dt, dd into an array before render
  // to aggregate components witouht a main root
  Object.keys(properties)
    .forEach(
      (key) => {
        collector.push(<dt key={key}>{key}</dt>);
        collector.push(
          <dd key={`${key}-${properties[key]}`}>{formatValue(properties[key])}</dd>
        );
      }
    );
      
  return (
    <dl className="dl-horizontal">
      {collector}
    </dl>
  );
}

export default Properties;