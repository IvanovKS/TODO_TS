import { title } from 'process';
import React from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: number,
  isDone: boolean,
  title: string,
}

type PropsType = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: number) => void,
  changeFilter: (value: FilterValuesType) => void,
}

export function Todo(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            return (
              <li>
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
        <button onClick={() => {props.changeFilter("all")}}>All</button>
        <button onClick={() => {props.changeFilter("active")}}>Active</button>
        <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
      </div>
    </div>
  );
}
