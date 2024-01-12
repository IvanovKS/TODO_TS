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

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((el) => {
        return el.id !== id;
      });
    tasksObj[todoListId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find ((el) => el.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks({...tasksObj});
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((el) => el.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<TodoListType[]>([
    {id: todoListId1, title: "Что купить", filter: "active"},
    {id: todoListId2, title: "Что продать", filter: "all"},
  ]);

  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((el) => el.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});
  }

  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      {id: v1(), title: "Магазин", isDone: true},
      {id: v1(), title: "Машина", isDone: true},
      {id: v1(), title: "Детский сад", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Парк", isDone: true},
      {id: v1(), title: "Сад", isDone: false},
    ],

  });

  return (
    <div className="App">
      {
        todoLists.map((el) => {
          let tasksForTodo = tasksObj[el.id];
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
            removeTodoList={removeTodoList}
          />
        })
      }
    </div>
  );
}

export default App;
