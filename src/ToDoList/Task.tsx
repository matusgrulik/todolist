import { TickIcon, TrashIcon } from "./Icons";
import { themes } from "./Theme";
import styled from "styled-components";

const DivTask = styled.div<{ completed: boolean }>`
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75em;
  max-heigh: 2em;
  overflow: auto;
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid ${themes.primaryColor};
  border-radius: 10px;
  opacity: ${(props) => (props.completed ? 0.5 : 1)};
`;
const DivPart = styled.div`
  margin-left: 10px;
  text-align: center;
  overflow: auto;
  max-width: 20%;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  & > svg {
    height: 2em;
  }
`;

export type TaskType = {
  id: string;
  title: string;
  text: string;
  deadlineDate: string;
  deadlineTime: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
};

type TaskProps = {
  task: TaskType;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

export const Task = (props: TaskProps) => {
  return (
    <DivTask completed={props.task.completed}>
      <DivPart>
        <h1>
          Title <br />
        </h1>
        <h2>{props.task.title}</h2>
      </DivPart>
      <DivPart>
        <h1>
          Text <br />
        </h1>
        <h4>{props.task.text}</h4>
      </DivPart>
      <DivPart>
        <h1>
          Deadline Date <br />
        </h1>
        <h4>{props.task.deadlineDate}</h4>
      </DivPart>
      <DivPart>
        <h1>
          Deadline Time <br />{" "}
        </h1>
        <h4>{props.task.deadlineTime}</h4>
      </DivPart>
      <div>
        <Button onClick={() => props.toggleTask(props.task.id)}>
          <TickIcon />
        </Button>
        <Button onClick={() => props.deleteTask(props.task.id)}>
          <TrashIcon />
        </Button>
      </div>
    </DivTask>
  );
};
