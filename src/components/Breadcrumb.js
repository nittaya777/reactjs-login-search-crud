import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  const isLast = (index) => {
    return index === props.crumbs.length - 1;
  };
  if (props.crumbs.length > 0) {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {props.crumbs.map((crumb, index) => {
            const disabled = isLast(index) ? "disabled" : "";
            return (
              <li key={index} className="breadcrumb-item">
                <button
                  className={`btn btn-link p-0 ${disabled}`}
                  aria-current="page"
                  onClick={() => props.selected(crumb)}
                >
                  {crumb}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  } else {
    return <></>;
  }
};
export default Breadcrumb;
