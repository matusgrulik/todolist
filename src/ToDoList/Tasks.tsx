import { Task, TaskType } from "./Task";

export const Tasks = (props: {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  filterType: "all" | "completed" | "active";
}) => {
  const filteredTasks =
    props.filterType === "all"
      ? props.tasks
      : props.filterType === "completed"
      ? props.tasks.filter((t) => t.completed)
      : props.filterType === "active"
      ? props.tasks.filter((t) => !t.completed)
      : [];

  const sortedTaskByTime = filteredTasks.sort(
    (t1, t2) => t2.createdAt - t1.createdAt
  );
  const sortedTasks = sortedTaskByTime.sort((t1, t2) =>
    t1.completed === t2.completed ? 0 : t1.completed ? 1 : -1
  );
  return (
    <>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={props.deleteTask}
          toggleTask={props.toggleTask}
        />
      ))}
    </>
  );
};
