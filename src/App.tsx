import React from "react";
import styles from "./App.module.css";
import { Modal } from "./components/UI";
import { useTodo } from "./utils/contexts";
import { TodoForm, TodoList } from "./components";
import Button from "./components/UI/Button/Button";

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.container}>
        <h1 className={styles.header}>Todo List</h1>
        <TodoForm mode="add" />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
