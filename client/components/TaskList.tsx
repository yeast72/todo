import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Task from "../models/task";
import TaskListItem from "./TaskListItem";

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 20px;
`;

type Props = {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
};

const TasksList: FunctionComponent<Props> = ({
  tasks,
  onDelete,
  onComplete
}) => {
  return (
    <Container>
      {tasks.map(task => (
        <TaskListItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </Container>
  );
};

export default TasksList;
