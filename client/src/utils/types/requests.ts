export type LoginRequest = {
  email: string;
  password: string;
};

export type CreateClassroomPayload = {
  name: string;
  theme: string;
  subject: string;
};

export type UpdateClassroomPayload = {
  id: string;
  name?: string;
  theme?: string;
  subject?: string;
  teachersIds?: string[];
  studentsIds?: string[];
};
