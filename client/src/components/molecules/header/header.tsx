import { HeaderDiv, HeaderDivButtons, HeaderDivTitle } from "./styles";
import { FiLogOut } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ModalCelule } from "../../celules/modal/modal";
import { useState } from "react";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { useAuth } from "../../../hooks/useAuth";
import { User } from "../../../utils/types/data";
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  console.log(isOpen);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({} as User);
    navigate("/");
  }

  function handleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <HeaderDiv>
      <HeaderDivTitle>
        <img src="/list.png" alt="icon" />
        <h2>Attendance Control</h2>
      </HeaderDivTitle>
      {user.id && (
        <HeaderDivButtons>
          {user.role === "teacher" && (
            <button onClick={handleModal}>
              <IoMdAddCircleOutline size={20} /> Create Classroom
            </button>
          )}
          <button onClick={handleLogout}>
            <FiLogOut size={20} />
          </button>
        </HeaderDivButtons>
      )}
      <ModalCelule
        handleModal={handleModal}
        isOpen={isOpen}
        children={
          <CreateClassroomForm
            changeEditingMode={handleModal}
            handleControl={() => {}}
          />
        }
      />
    </HeaderDiv>
  );
}
