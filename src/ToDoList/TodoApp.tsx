import * as yup from "yup";
import { Helmet } from "react-helmet";
import { LinkActive, LinkAll, LinkCompleted } from "./UrlBasement";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { STORAGE_NAME } from "./utils";
import { TaskType } from "./Task";
import { Tasks } from "./Tasks";
import { formatWithOptions } from "util";
import { getId } from "./utils";
import { themes } from "./Theme";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "./utils";
import { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

const H1 = styled.h1`
  margin-left: 1em;
  margin-bottom: 1em;
  text-transform: uppercase;
  text-align: center;
`;

const DivTaskFilters = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DivTaskList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-right: 15px;
`;

const DivWrapper = styled.div`
  font-family: ${themes.primaryFont};
  margin-top: 10em;
  margin: auto;
  width: 80%;
`;

const Button = styled.button`
  margin-top: 1em;
  margin-bottom: 2em;
  margin-left: -1em;
  border: 2px solid ${themes.secondaryColor};
  border-radius: 10px;
  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  color: ${themes.secondaryColor};
  font-size: 1.8em;
`;

const Input = styled.input`
  font-size: 0.9em;
  text-align: center;
  padding: 0.3em 1em;
`;
const Label = styled.label`
  font-size: 0.8em;
  text-transform: ${themes.textTransform};
  font-weight: bold;
  margin: 0.5em;
  color: ${themes.primaryColor};
`;
const Form = styled.form`
  text-align: center;
  max-width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const InputDiv = styled.div`
  font-size: 1.8em;
  text-align: center;
  margin: 0 1em 0 0;
  width: 80%;
`;
const ErrorDiv = styled.div`
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  padding: 0;
  margin: 0.5em;
`;
const inputsSchema = yup.object().shape({
  taskTitle: yup.string().required("Title is required"),
  taskText: yup.string().required("Text is required"),
  taskDeadlineDate: yup.string().required("Deadline Date is required"),
  taskDeadlineTime: yup.string().required("Deadline Time is required"),
});

export const TodoApp = () => {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>(STORAGE_NAME, []);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskText, setTaskText] = useState("");
  const [taskDeadlineDate, setTaskDeadlineDate] = useState("");
  const [taskDeadlineTime, setTaskDeadlineTime] = useState("");
  const focusMe = useRef<HTMLInputElement>(null);

  const form = useForm({ resolver: yupResolver(inputsSchema) });
  const addTask = () => {
    const d = new Date();
    const newTask = {
      id: getId(),
      title: taskTitle,
      text: taskText,
      deadlineDate: taskDeadlineDate,
      deadlineTime: taskDeadlineTime,
      completed: false,
      createdAt: d.getTime(),
      completedAt: null,
    };
    setTasks((p) => [...p, newTask]);
    setTaskTitle("");
    setTaskText("");
    setTaskDeadlineDate("");
    setTaskDeadlineTime("");
  };

  const toggleTask = (id: string) => {
    const d = new Date();
    setTasks((p) =>
      p.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: task.completed ? null : new Date().getTime(),
            }
          : task
      )
    );

    focusMe.current?.focus();
  };

  const deleteTask = (id: string) => {
    setTasks((p) => p.filter((task) => task.id !== id));
    focusMe.current?.focus();
  };

  const handleAddKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <Router>
      <Helmet>
        <title>To do list</title>
      </Helmet>
      <DivWrapper>
        <H1>To do list application</H1>

        <Form>
          <InputDiv>
            <Label>Task Title</Label>
            <ErrorDiv>{form.formState.errors.taskTitle?.message}</ErrorDiv>
            <Input
              {...form.register("taskTitle")}
              type="text"
              name="taskTitle"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
            />
          </InputDiv>
          <InputDiv>
            <Label>Task Text</Label>
            <ErrorDiv>{form.formState.errors.taskText?.message}</ErrorDiv>
            <Input
              {...form.register("taskText")}
              required
              type="text"
              name="taskText"
              placeholder="Task Text"
              value={taskText}
              onChange={(e) => {
                setTaskText(e.target.value);
              }}
            />
          </InputDiv>
          <InputDiv>
            <Label>Deadline Date</Label>
            <ErrorDiv>
              {form.formState.errors.taskDeadlineDate?.message}
            </ErrorDiv>
            <Input
              {...form.register("taskDeadlineDate")}
              required
              type="date"
              name="taskDeadlineDate"
              value={taskDeadlineDate}
              onChange={(e) => {
                setTaskDeadlineDate(e.target.value);
              }}
            />
          </InputDiv>
          <InputDiv>
            <Label>Deadline time</Label>
            <ErrorDiv>
              {form.formState.errors.taskDeadlineTime?.message}
            </ErrorDiv>
            <Input
              {...form.register("taskDeadlineTime")}
              type="time"
              name="taskDeadlineTime"
              value={taskDeadlineTime}
              onChange={(e) => {
                setTaskDeadlineTime(e.target.value);
              }}
              onKeyPress={handleAddKey}
            />
          </InputDiv>
          <Button onClick={form.handleSubmit(addTask)}>Submit</Button>
        </Form>

        <DivTaskFilters>
          <LinkAll />
          <LinkActive />
          <LinkCompleted />
        </DivTaskFilters>

        <DivTaskList>
          <Switch>
            <Route exact path="/todolist/all">
              <Tasks
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                filterType="all"
              />
            </Route>
            <Route exact path="/todolist/active">
              <Tasks
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                filterType="active"
              />
            </Route>
            <Route exact path="/todolist/completed">
              <Tasks
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                filterType="completed"
              />
            </Route>
          </Switch>
        </DivTaskList>
      </DivWrapper>
    </Router>
  );
};
