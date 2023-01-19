export type User = {
  classroomStudentId: string | null;
  classroomTeacherId: string | null;
  cpf: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  role: string;
};

export type Classroom = {
  id: string;
  name: string;
  subject: string;
  theme: string;
  students: User[];
  teachers: User[];
  attendances: AttendancePayload[];
};

export type AttendancePayload = {
  id: string;
  classroomId: string;
  startDate: string;
  endDate: string;
  day: string;
  students: User[];
};
