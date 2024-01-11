// import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string,
  isDone: boolean,
  title: string,
}

type PropsType = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValuesType) => void,
  addTask: (title: string) => void,
}

export function Todo(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // ***functions
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value);
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onAllClickHandler = () => {props.changeFilter("all")};
  const onActiveClickHandler = () => {props.changeFilter("active")};
  const onCompletedClickHandler = () => {props.changeFilter("completed")};
  // ***---------------------------

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input  value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            return (
              <li key={el.id}>
                <input type="checkbox" checked={el.isDone} />
                <span>{el.title}</span>
                <button onClick={ () => {
                  props.removeTask(el.id)
                }}>Delete</button>
              </li>
            );
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
