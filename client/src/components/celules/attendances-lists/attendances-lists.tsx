import { useEffect, useState } from "react";
import { api } from "../../../utils/api/api";
import { AttendancePayload } from "../../../utils/types/data";
import { sortedAttendance } from "../../../utils/functions/sortedAttendanceByDays";
import {
  AttendanceListBox,
  AttendanceListCard,
  AttendanceListSection,
} from "./styles";

export type AttendacesListsProps = {
  selectedClassroom: string | undefined;
};

export default function AttendancesList({
  selectedClassroom,
}: AttendacesListsProps) {
  const [attendances, setAttendances] = useState<AttendancePayload[]>([]);
  const [control, setControl] = useState<boolean>(false);

  const sortedAttendancesByClassroomId = selectedClassroom
    ? attendances.filter(
        (attendance) => attendance.classroomId === selectedClassroom
      )
    : [];

  const sortedClassroomAttendances = sortedAttendance(
    sortedAttendancesByClassroomId
  );

  async function findAttendances() {
    const data = await api.getAttendanceLists();
    setAttendances(data);
  }

  async function createAttendanceList() {
    if (!selectedClassroom) {
      alert("Select a classroom");
      return;
    }
    const data = await api.createAttendanceListToClassroom(selectedClassroom);
    console.log(data);
    setControl(!control);
  }

  useEffect(() => {
    findAttendances();
  }, [control]);

  return (
    <AttendanceListSection>
      <div>
        <button disabled={!selectedClassroom} onClick={createAttendanceList}>
          Create Attendance List to this Classroom
        </button>
        <h2>Attendances Lists</h2>
      </div>
      <AttendanceListBox>
        {sortedClassroomAttendances.map((attendance, index) => {
          return (
            <AttendanceListCard key={index}>
              <h2>{attendance.date}</h2>
              {attendance.attendances.map((attendance, index) => {
                return (
                  <div>
                    <h3>Hour: {attendance.hour}</h3>
                    <div>
                      <h3>Students:</h3>
                      <ul>
                        {attendance.students?.map((student, index) => {
                          return <li key={index}>{student.name}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </AttendanceListCard>
          );
        })}
      </AttendanceListBox>
    </AttendanceListSection>
  );
}
