import * as React from "react";
import styled, { ThemeConsumer } from "styled-components";
import "isomorphic-unfetch";
import axios from "axios";

import Task from "../models/task";
import TaskList from "../components/TaskList";
import NewTaskForm from "../components/NewTaskForm";

const Container = styled.div`
  margin: 20px auto;
  border: 1px solid gray;
  background: papayawhip;
  border-radius: 10px;
  max-width: 500px;
  min-width: 400px;
`;

const Header = styled.h1`
  text-align: center;
`;

interface State {
  tasks: Array<Task>;
  newTask: Task;
}
interface Props {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: { _id: "0", title: "", isComplete: false }
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:8080/tasks");
    const json = await res.json();
    this.setState({ tasks: json });
  }

  private onDeleteTask = async (task: Task) => {
    await axios.delete(`http://localhost:8080/tasks/${task._id}`);
    const newTasks = this.state.tasks.filter(t => t._id !== task._id);
    this.setState({ tasks: newTasks });
  };

  private onChangeAddTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({
      newTask: {
        ...this.state.newTask,
        title: event.target.value
      }
    });
  };

  private onAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:8080/tasks", {
      title: this.state.newTask.title
    });
    const task = await res.data;
    const updatedTasks = [...this.state.tasks, task];
    this.setState({
      tasks: updatedTasks,
      newTask: { _id: "0", title: "", isComplete: false }
    });
  };

  private handleOnClickTask = async (task: Task) => {
    const updateTask = { ...task, isComplete: !task.isComplete };
    const updateTasks = this.state.tasks.map(t => {
      if (t._id === task._id) {
        t.isComplete = !t.isComplete;
        return updateTask;
      }
      return t;
    });
    this.setState({ tasks: updateTasks });
    const res = await axios.put(`http://localhost:8080/tasks/${task._id}`, {
      task: updateTask
    });
  };

  render() {
    const tasks = this.state.tasks;
    const completeTasks = tasks.filter(task => task.isComplete === true);
    const notCompleteTasks = tasks.filter(task => task.isComplete === false);
    const sortedTasks = [...notCompleteTasks, ...completeTasks];
    const newTask = this.state.newTask;
    return (
      <Container>
        <Header>Todo List</Header>
        <TaskList
          tasks={sortedTasks}
          onDelete={this.onDeleteTask}
          onComplete={this.handleOnClickTask}
        />
        <NewTaskForm
          task={newTask}
          onAdd={this.onAddTask}
          onChange={e => this.onChangeAddTask(e)}
        />
      </Container>
    );
  }
}

export default App;
