import { api } from "../../../utils/api/api";
import { Classroom } from "../../../utils/types/data";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";
import {
  CardInfoContainer,
  ClassroomCardContainer,
  ClassroomCardOptionsContainer,
} from "./styles";

export type ClassroomCardProps = {
  classroom: Classroom;
  changeEditingMode: () => void;
  handleControl: () => void;
  editingMode: boolean;
};
export function ClassroomCard({
  classroom,
  changeEditingMode,
  editingMode,
  handleControl,
}: ClassroomCardProps) {
  async function handleDeleteClassroom() {
    await api.deleteClassroom(classroom.id ?? "");
    handleControl();
  }

  return (
    <ClassroomCardContainer>
      <CardInfoContainer>
        <section>
          <span>Classroom:</span>
          <h2>{classroom?.name}</h2>
        </section>
        <section>
          <span>Theme:</span>
          <h2>{classroom?.theme}</h2>
        </section>
        <section>
          <span>Subject:</span>
          <h2>{classroom?.subject}</h2>
        </section>
        <section>
          <span>Teachers:</span>
          {classroom?.teachers.map((teacher) => {
            return (
              <div>
                <span>name:</span>
                <h3 key={teacher.id}>{teacher.name}</h3>
              </div>
            );
          })}
        </section>
      </CardInfoContainer>
      <ClassroomCardOptionsContainer>
        <button
          onClick={() => {
            changeEditingMode();
          }}
        >
          Edit this classroom
        </button>
        <button onClick={handleDeleteClassroom}>Delete this classroom</button>
        {editingMode ? (
          <UpdateClassroomForm
            handleControl={handleControl}
            classroom={classroom}
            changeEditingMode={changeEditingMode}
          />
        ) : (
          <CreateClassroomForm handleControl={handleControl} />
        )}
      </ClassroomCardOptionsContainer>
    </ClassroomCardContainer>
  );
}
