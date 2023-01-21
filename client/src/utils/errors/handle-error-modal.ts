import Swal from "sweetalert2";

export function HandleError(err: any) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: err.message,
  });
}
