import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Task from "../models/task";

const Input = styled.input`
  padding: 0.374 0.75rem;
  border: 1px solif #ced4da;
  border-radius: 0.25rem;
`;

const Container = styled.form`
  text-align: center;
`;

type Props = {
  task: Task;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (e: React.FormEvent<HTMLFormElement>) => void;
};

const NewTaskForm: FunctionComponent<Props> = ({ onChange, onAdd, task }) => (
  <Container onSubmit={onAdd}>
    <Input onChange={onChange} value={task.title} name="title" />
    <button>Add a task</button>
  </Container>
);

export default NewTaskForm;
