import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../utils/api/api";
import { HandleError } from "../../../utils/errors/handle-error-modal";
import { sortedAttendance } from "../../../utils/functions/sortedAttendanceByDays";
import { AttendancePayload, Classroom } from "../../../utils/types/data";
import { PersonalizedInput } from "../../atoms/form/styles";
import AttendancesList from "../../celules/attendances-lists/attendances-lists";
import { CardInfoContainer, ClassroomCardContainer } from "./styles";
import { useAuth } from "../../../hooks/useAuth";

export type ClassroomCardProps = {
  classroom?: Classroom;
};

export function ClassroomPage({ classroom }: ClassroomCardProps) {
  const [classroomData, setClassroomData] = useState<Classroom>(
    classroom ?? ({} as Classroom)
  );
  const [myAttendances, setMyAttendances] = useState<AttendancePayload[]>([]);
  const [control, setControl] = useState(false);
  const { user } = useAuth();

  async function getClassroomData(id: string) {
    const data = await api.getClassroomById(id);
    setClassroomData(data);
  }

  async function getMyAttendances() {
    const data = await api.myAttendances();
    setMyAttendances(data);
    console.log(data);
  }

  async function registerInAttendanceList(id: string) {
    const data = await api.registerOnAttendance(id);
    setControl(!control);
    console.log(data);
  }

  const attendancesByDay = sortedAttendance(myAttendances);

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
  }, [control]);

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
        <div>
          <h2>Register on attendance</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              registerInAttendanceList(event.currentTarget.attendanceId.value);
              console.log(new Date(event.currentTarget.data.value));
            }}
          >
            <PersonalizedInput
              type="text"
              placeholder="Enter attendance id"
              name="attendanceId"
            />
            <input type="date" name="data" />
            <button>Submit</button>
          </form>
          <h2>My Attendances:</h2>
          {attendancesByDay.map((attendancesByDay) => {
            return (
              <div>
                <h2>Attendances of day: {attendancesByDay.date}</h2>
                {attendancesByDay.attendances.map((attendance) => {
                  return <h3>Hour: {attendance.hour}</h3>;
                })}
              </div>
            );
          })}
        </div>
      )}
    </ClassroomCardContainer>
  );
}
