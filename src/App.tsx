import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo } from './Todo';

function App() {
  let tasks1 = [
    {id: 1, title: 'Магазин', isDone: true},
    {id: 2, title: 'Машина', isDone: true},
    {id: 3, title: 'Детский сад', isDone: false},
  ];
  let tasks2 = [
    {id: 1, title: 'Больница', isDone: true},
    {id: 2, title: 'Бассейн', isDone: false},
    {id: 3, title: 'Парк', isDone: false},
  ];
  return (
    <div className="App">
      <Todo title = "Monday" tasks = {tasks1}/>
      <Todo title = "Tuesday" tasks = {tasks2}/>
      {/* <Todo title = "Wednesday"/> */}
    </div>
  );
}

export default App;
