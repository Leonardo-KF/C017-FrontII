import { api } from "../../../utils/api/api";
import { Classroom } from "../../../utils/types/data";
import { CreateClassroomForm } from "../../celules/create-classroom-form/create-classroom-form";
import { UpdateClassroomForm } from "../../celules/update-classroom-form/update-classroom-form";
import {
  CardInfoContainer,
  ClassroomCardContainer,
  ClassroomCardOptionsContainer,
} from "./styles";

export type ClassroomCardProps = {
  classroom: Classroom;
};
export function ClassroomCard({ classroom }: ClassroomCardProps) {
  return (
    <ClassroomCardContainer>
      <CardInfoContainer>
        <section>
          <span>Classroom:</span>
          <h2>{classroom?.name}</h2>
        </section>
        <section>
          <span>Theme:</span>
          <h2>{classroom?.theme}</h2>
        </section>
        <section>
          <span>Subject:</span>
          <h2>{classroom?.subject}</h2>
        </section>
        <section>
          <span>Teachers:</span>
          {classroom?.teachers.map((teacher) => {
            return (
              <div>
                <span>name:</span>
                <h3 key={teacher.id}>{teacher.name}</h3>
              </div>
            );
          })}
        </section>
      </CardInfoContainer>
    </ClassroomCardContainer>
  );
}
