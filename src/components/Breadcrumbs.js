import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = (props) => {
  const isLast = (index) => {
    return index === breadcrumbs.length - 1;
  };
  /*กำหนดเอง*/
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/sale":
        setBreadcrumbs([
          { title: "หน้าแรก", path: "/" },
          { title: "รายการคำสั่งซื้อ", path: "" },
        ]);
        break;
      case "/payment":
        setBreadcrumbs([
          { title: "หน้าแรก", path: "/" },
          { title: "รายการแจ้งชำระเงิน", path: "" },
        ]);
        break;

      default:
        setBreadcrumbs([]);
        break;
    }
  }, [location]);

  return (
    <nav aria-label="breadcrumb" className="p-2">
      <ol className="breadcrumb mb-0">
        {breadcrumbs.map((crumb, index) => {
          const disabled = isLast(index) ? "disabled" : "";
          const name=crumb.title;
          const routeTo = crumb.path;
          return (
            <li key={index} className="breadcrumb-item">
              <Link
                to={routeTo}
                className={`btn btn-link p-0 ${disabled}`}
                aria-current="page"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  /* เช็คตาม path */
  // const {history} = props;
  // const location = useLocation();
  // const pathnames = location.pathname.split('/').filter(x=>x);
  // const isLast = (index) => {
  //     return index === pathnames.length - 1;
  //   };
  // return (
  //     <nav aria-label="breadcrumb">
  //       <ol className="breadcrumb">
  //         {pathnames.map((name, index) => {
  //           const disabled = isLast(index) ? "disabled" : "";
  //           const routeTo = `/${pathnames.slice(0,index+1).join('/')}`;
  //           return (
  //             <li key={index} className="breadcrumb-item">
  //               <Link to={routeTo}
  //                 className={`btn btn-link p-0 ${disabled}`}
  //                 aria-current="page"
  //               >
  //                 {name}
  //               </Link>
  //             </li>
  //           );
  //         })}
  //       </ol>
  //     </nav>
  //   );
};
export default Breadcrumbs;
