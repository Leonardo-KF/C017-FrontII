import { useEffect, useState } from "react";
import { api } from "../../../utils/api/api";
import { Classroom } from "../../../utils/types/data";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";
import {
  CardInfoContainer,
  ClassroomCardContainer,
  ClassroomCardOptionsContainer,
} from "./styles";
import { useParams } from "react-router-dom";
import { HandleError } from "../../../utils/errors/handle-error-modal";
import AttendancesList from "../../celules/attendances-lists/attendances-lists";

export type ClassroomCardProps = {
  classroom?: Classroom;
};
export function ClassroomPage({ classroom }: ClassroomCardProps) {
  const [classroomData, setClassroomData] = useState<Classroom>(
    classroom ?? ({} as Classroom)
  );

  async function getClassroomData(id: string) {
    const data = await api.getClassroomById(id);
    setClassroomData(data);
  }

  const { id } = useParams();

  useEffect(() => {
    if (!classroom) {
      console.log(id);
      if (!id) {
        HandleError({ message: "Classroom not found" });
      } else {
        getClassroomData(id);
      }
    }
  }, []);

  return (
    <ClassroomCardContainer>
      <CardInfoContainer>
        <section>
          <span>Classroom:</span>
          <h2>{classroomData.name}</h2>
        </section>
        <section>
          <span>Theme:</span>
          <h2>{classroomData.theme}</h2>
        </section>
        <section>
          <span>Subject:</span>
          <h2>{classroomData.subject}</h2>
        </section>
        <section>
          <span>Teachers:</span>
          {classroomData.teachers?.map((teacher) => {
            return (
              <div>
                <span>name:</span>
                <h3 key={teacher.id}>{teacher.name}</h3>
              </div>
            );
          })}
        </section>
      </CardInfoContainer>
      <AttendancesList selectedClassroom={classroomData.id} />
      {/* <ClassroomCardOptionsContainer>
        {selectedClassroom && (
          <>
            <button
              onClick={() => {
                handleEditMode();
              }}
            >
              Edit this classroom
            </button>
            <button onClick={handleDeleteClassroom}>
              Delete this classroom
            </button>
          </>
        )}
        {isEditingMode ? (
          <UpdateClassroomForm
            handleControl={handleControl}
            classroom={classroomSelectedData ?? ({} as Classroom)}
            changeEditingMode={handleEditMode}
          />
        ) : (
          <CreateClassroomForm handleControl={handleControl} />
        )}
      </ClassroomCardOptionsContainer> */}
    </ClassroomCardContainer>
  );
}
