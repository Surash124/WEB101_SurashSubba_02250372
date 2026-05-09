import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import useTodoStore from './store/todoStore'

function App() {
  const todoCount = useTodoStore((state) => state.todos.length)
  const completedCount = useTodoStore(
    (state) => state.todos.filter((todo) => todo.completed).length
  )

  return (
    <div>
      <h1>Todo List with Zustand</h1>

      <TodoInput />

      <div>
        <p>Total todos: {todoCount}</p>
        <p>Completed: {completedCount}</p>
      </div>

      <TodoList />
    </div>
  )
}

export default App
{/* todoCount — gets the total number of todos from the store
completedCount — filters and counts only completed todos
Everything is assembled here — input, stats, and the list */}
