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
import { PersonalizedInput } from "../../atoms/form/styles";

export type ClassroomCardProps = {
  classroom?: Classroom;
};
export function ClassroomPage({ classroom }: ClassroomCardProps) {
  const [classroomData, setClassroomData] = useState<Classroom>(
    classroom ?? ({} as Classroom)
  );

  const [myAttendances, setMyAttendances] = useState<any>([]);

  async function getClassroomData(id: string) {
    const data = await api.getClassroomById(id);
    setClassroomData(data);
  }

  async function getMyAttendances() {
    const data = await api.myAttendances();
    setMyAttendances(data);
    console.log(data);
  }

  const user = JSON.parse(localStorage.getItem("user") ?? "");

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

  useEffect(() => {
    getMyAttendances();
  }, []);

  // HOC = High Order Component

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
      {user.role === "teacher" ? (
        <AttendancesList selectedClassroom={classroomData.id} />
      ) : (
        <>
          <h2>Register on attendance</h2>
          <PersonalizedInput type="text" placeholder="Enter attendance id" />
          <h2>My Attendances:</h2>
          {myAttendances.map((attendance) => {
            return (
              <div>
                <h2>{attendance.day}</h2>
              </div>
            );
          })}
        </>
      )}
    </ClassroomCardContainer>
  );
}
