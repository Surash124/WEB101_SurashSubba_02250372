import useTodoStore from '../store/todoStore'
import TodoItem from './TodoItem'

function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {todos.length > 0 && (
        <button onClick={clearCompleted}>Clear Completed</button>
      )}
    </div>
  )
}

export default TodoList

/* 

todos — grabs the full todo list from the store
clearCompleted — grabs the clear action from the store
todos.map() — loops through every todo and renders a TodoItem for each
key={todo.id} — React needs a unique key for each item in a list
todo={todo} — passes the individual todo to TodoItem as a prop
todos.length > 0 — only shows the "Clear Completed" button when there are todos

*/