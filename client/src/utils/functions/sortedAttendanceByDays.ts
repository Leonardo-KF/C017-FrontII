import { AttendancePayload, User } from "../types/data";

export type sortedAttendances = {
  date: string;
  attendances: Attendance[];
};

export type Attendance = {
  hour: number;
  students?: User[];
};
export function sortedAttendance(attendances: AttendancePayload[]) {
  const attendancesByDay = [] as sortedAttendances[];
  let lastAttendanceDay = {
    date: "",
    attendances: [] as Attendance[],
  };
  attendances.forEach((attendance) => {
    const date = new Date(attendance.startDate).toLocaleDateString();
    if (date !== lastAttendanceDay.date) {
      attendancesByDay.push(lastAttendanceDay);
      lastAttendanceDay.date = date;
      lastAttendanceDay.attendances = [];
    }
    lastAttendanceDay.attendances.push({
      hour: new Date(attendance.startDate).getHours(),
      students: attendance.students,
    });
  });
  return attendancesByDay;
}
