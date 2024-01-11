import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, Todo } from './Todo';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: 'Магазин', isDone: true},
    {id: v1(), title: 'Машина', isDone: true},
    {id: v1(), title: 'Детский сад', isDone: false},
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((el) => {
        return el.id !== id;
      });
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodo = tasks;
  if (filter === "completed") {
    tasksForTodo = tasksForTodo.filter((el) => {
      return el.isDone === true;
    });
  }
  if (filter === "active") {
    tasksForTodo = tasksForTodo.filter((el) => {
      return el.isDone === false;
    });
  }

  return (
    <div className="App">
      <Todo title = "Monday" 
            tasks = {tasksForTodo}
            removeTask = {removeTask}
            changeFilter = {changeFilter}
            addTask = {addTask}
      />
    </div>
  );
}

export default App;
