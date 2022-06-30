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
  text: string;
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
      <h2>{props.task.text}</h2>
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
