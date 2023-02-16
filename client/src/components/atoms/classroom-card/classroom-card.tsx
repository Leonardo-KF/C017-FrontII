import { useNavigate } from "react-router-dom";
import { ClassroomCardButton } from "./styles";
import Swal from "sweetalert2";
import { api } from "../../../utils/api/api";
import { useAuth } from "../../../hooks/useAuth";

export type CardProps = {
  id: string;
  name: string;
  theme: string;
  color: string;
};

export function ClassroomCard({ id, name, theme, color }: CardProps) {
  const { user } = useAuth();

  const navigate = useNavigate();
  function modal() {
    Swal.fire({
      title: "Do you want?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "View this classroom",
      denyButtonText: "Enter in this classroom",
      denyButtonColor: "blue",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/classroom/" + id);
      } else if (result.isDenied) {
        if (user.role === "teacher") {
          const response = await api.enterInClassroomWithTeacher(id, user.id);
          if (response) {
            Swal.fire("Entered!", "", "success");
            navigate("/classroom/" + id);
          }
        } else {
          console.log("rodou");
          const response = await api.enterInClassroomWithStudent(id);
          if (response) {
            Swal.fire("Entered!", "", "success");
            navigate("/classroom/" + id);
          }
        }
      }
    });
  }

  return (
    <ClassroomCardButton backgroundColor={color} onClick={modal}>
      <h2>{name}</h2>
      <h3>{theme}</h3>
    </ClassroomCardButton>
  );
}
