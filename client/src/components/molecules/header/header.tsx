import { HeaderDiv, HeaderDivButtons, HeaderDivTitle } from "./styles";
import { FiLogOut } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { User } from "../../../utils/types/data";
export function Header() {
  const navigate = useNavigate();

  let user = {} as User;
  if (localStorage.getItem("token") !== null)
    user = JSON.parse(localStorage.getItem("user") ?? "");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <HeaderDiv>
      <HeaderDivTitle>
        <img src="list.png" alt="icon" />
        <h2>Attendance Control</h2>
      </HeaderDivTitle>
      {user.id && (
        <HeaderDivButtons>
          {user.role === "teacher" && (
            <button>
              <IoMdAddCircleOutline size={20} /> Create Classroom
            </button>
          )}
          <button onClick={handleLogout}>
            <FiLogOut size={20} />
          </button>
        </HeaderDivButtons>
      )}
    </HeaderDiv>
  );
}
