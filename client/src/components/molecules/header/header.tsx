import { HeaderDiv, HeaderDivButtons, HeaderDivTitle } from "./styles";
import { FiLogOut } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { User } from "../../../utils/types/data";
import { ModalCelule } from "../../celules/modal/modal";
import { useState } from "react";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import listIcon from "../../../assets/list.png";
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  console.log(isOpen);

  let user = {} as User;
  if (localStorage.getItem("token") !== null)
    user = JSON.parse(localStorage.getItem("user") ?? "");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
