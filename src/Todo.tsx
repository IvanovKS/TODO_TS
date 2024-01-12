// import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { error } from 'console';

export type TaskType = {
  id: string,
  isDone: boolean,
  title: string,
}

type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValuesType, todoListId: string) => void,
  addTask: (title: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean) => void,
  filter: FilterValuesType,
}

export function Todo(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ***functions
  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Обязательное поле");
      return;
    }
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value);
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTask();
    }
  };
  const onAllClickHandler = () => {props.changeFilter("all", props.id)};
  const onActiveClickHandler = () => {props.changeFilter("active", props.id)};
  const onCompletedClickHandler = () => {props.changeFilter("completed", props.id)};
  // ***---------------------------

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input  value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
                />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(el.id, event.currentTarget.checked)};
            return (
              <li key={el.id} className={el.isDone ? "is-done" : ""}>
                <input  type="checkbox" 
                        checked={el.isDone}
                        onChange={onChangeHandler}
                        />
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
        <button className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
