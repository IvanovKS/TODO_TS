import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todo } from './Todo';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    {id: 1, title: 'Магазин', isDone: true},
    {id: 2, title: 'Машина', isDone: true},
    {id: 3, title: 'Детский сад', isDone: false},
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((el) => {
        return el.id !== id;
      });
    setTasks(filteredTasks);
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
      />
    </div>
  );
}

export default App;
