import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(initialTodos);

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false,
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(draft => {
      draft.map(d => {
        if (d.id === nextTodo.id) {
          d.title = nextTodo.title;
          d.done = nextTodo.done;
        }
      });
    });
  }

  function handleDeleteTodo(todoId) {
    updateTodos(draft => {
      return draft.filter(d => d.id !== todoId);
    });
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
