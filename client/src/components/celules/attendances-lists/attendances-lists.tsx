import { useEffect, useState } from "react";
import { api } from "../../../utils/api/api";
import { AttendancePayload } from "../../../utils/types/data";

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
    <section>
      <h2>Attendances Lists</h2>
      <button disabled={!selectedClassroom} onClick={createAttendanceList}>
        Create Attendance List to this Classroom
      </button>
      {sortedAttendancesByClassroomId.map((attendance) => {
        return (
          <div key={attendance.id}>
            <span>{attendance.day}</span>
            <span>{attendance.startDate}</span>
            <span>{attendance.endDate}</span>
          </div>
        );
      })}
    </section>
  );
}
