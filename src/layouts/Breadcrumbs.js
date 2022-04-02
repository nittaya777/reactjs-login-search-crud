import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const Breadcrumbs = (props) => {
  let breadcrumbsList = props.breadcrumbs;
  const isLast = (index) => {
    return index === breadcrumbsList.length - 1;
  };

  if (breadcrumbsList.length > 0) {
    return (
      <Breadcrumb className="light">
        {breadcrumbsList.map((crumb, index) => {
          const active = isLast(index) ? "active" : "";

          if (active === "active") {
            return <BreadcrumbItem className="text-light my-1 mr-5" key={index}>{crumb.title}</BreadcrumbItem>;
          } else {
            return (
              <BreadcrumbItem className="text-light my-1 mr-5" active  key={index}>
                <a href={crumb.path} className="text-light">{crumb.title}</a>
              </BreadcrumbItem>
            );
          }
        })}
      </Breadcrumb>
    );
  } else {
    return <></>;
  }
};
export default Breadcrumbs;
