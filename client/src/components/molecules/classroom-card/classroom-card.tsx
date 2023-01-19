import { api } from "../../../utils/api/api";
import { Classroom } from "../../../utils/types/data";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";

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
    <div>
      <h2>{classroom?.name}</h2>
      <h2>{classroom?.theme}</h2>
      <h2>{classroom?.subject}</h2>
      {classroom?.teachers.map((teacher) => {
        return <h3 key={teacher.id}>{teacher.name}</h3>;
      })}
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
    </div>
  );
}
