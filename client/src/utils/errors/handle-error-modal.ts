import Swal from "sweetalert2";

type HandleErrorProps = {
  message: string;
};

export function HandleError({ message }: HandleErrorProps) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}
