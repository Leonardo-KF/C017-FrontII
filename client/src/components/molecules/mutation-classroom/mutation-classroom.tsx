import { Classroom } from "../../../utils/types/data";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";

type MutationClassroomProps = {
  selectedClassroom?: Classroom;
  handleControl: () => void;
};

export function MutationClassroom({
  selectedClassroom,
  handleControl,
}: MutationClassroomProps) {
  return (
    <div>
      {selectedClassroom ? (
        <UpdateClassroomForm
          handleControl={handleControl}
          classroom={selectedClassroom}
          changeEditingMode={() => {}}
        />
      ) : (
        <CreateClassroomForm
          handleControl={handleControl}
          changeEditingMode={() => {}}
        />
      )}
    </div>
  );
}
