import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, Todo } from './Todo';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType,
}

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: "Магазин", isDone: true},
    {id: v1(), title: "Машина", isDone: true},
    {id: v1(), title: "Детский сад", isDone: false},
  ]);

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

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find ((el) => el.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    let copyArr = [...tasks];
    setTasks(copyArr);
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((el) => el.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  let [todoLists, setTodoLists] = useState<TodoListType[]>([
    {id: v1(), title: "Что купить", filter: "active"},
    {id: v1(), title: "Что продать", filter: "all"},
  ]);

  return (
    <div className="App">
      {
        todoLists.map((el) => {
          let tasksForTodo = tasks;
          if (el.filter === "completed") {
            tasksForTodo = tasksForTodo.filter((el) => {
              return el.isDone === true;
            });
          }
          if (el.filter === "active") {
            tasksForTodo = tasksForTodo.filter((el) => {
              return el.isDone === false;
            });
          }
          return <Todo 
            key={el.id}
            id={el.id}
            title={el.title}
            tasks={tasksForTodo}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={el.filter}
          />
        })
      }
    </div>
  );
}

export default App;
