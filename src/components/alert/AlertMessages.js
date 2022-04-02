import Swal from "sweetalert2";
const AlertMessage =(props)=> {
    if (props.message !== null) {
      switch (props.type) {
        case "success":
          Swal.fire({
            title: props.message,
            icon: "success",
            confirmButtonText: "ok",
          });
          break;
        case "error":
          Swal.fire({
            title: props.message,
            icon: "error",
            confirmButtonText: "ok",
          });
          break;
        default:
      }
    }
}


export {AlertMessage};
