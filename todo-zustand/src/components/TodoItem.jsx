import useTodoStore from '../store/todoStore'

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span style={{
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.text}
      </span>
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoItem

/*
{ todo } — receives a single todo object as a prop from TodoList
toggleTodo — grabs the toggle action from the store
removeTodo — grabs the remove action from the store
checked={todo.completed} — checkbox reflects the completed status
line-through — strikes through text when todo is completed
todo.id — passed to toggle/remove so the store knows which todo to update

Note: This is the only place to use props in this project — just to pass the individual todo object from TodoList down to TodoItem. Everything else comes from the store directly.

*/