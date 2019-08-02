import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Task from "../models/task";

const Container = styled.li<{ isComplete: boolean }>`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  background-color: ${props => (props.isComplete ? "#e6e6e6" : "white")};
  :hover {
    background-color: #e6e6e6;
    transition: background-color 0.2s ease-out;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.p<{ isComplete: boolean }>`
  text-decoration: ${props => (props.isComplete ? "line-through" : "")};
  margin: 0;
`;

const DeleteButton = styled.button`
  background-color: #ff402b;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid #d83526;
  cursor: pointer;
  :hover {
    background-color: #c12d1d;
    transition: background-color 0.1s ease-out;
  }
`;

type Props = {
  task: Task;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
};

const TaskListItem: FunctionComponent<Props> = ({
  task,
  onDelete,
  onComplete
}) => {
  const onDeleteHandle = () => {
    onDelete(task);
  };

  const onCompleteHandle = () => {
    onComplete(task);
  };
  return (
    <Container isComplete={task.isComplete}>
      <input
        type="checkbox"
        checked={task.isComplete}
        onChange={onCompleteHandle}
      />
      <Content>
        <Title isComplete={task.isComplete}>{task.title}</Title>
      </Content>
      <DeleteButton onClick={onDeleteHandle}>X</DeleteButton>
    </Container>
  );
};

export default TaskListItem;
