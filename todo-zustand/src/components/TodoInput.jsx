import { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoInput() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = () => {
    if (text.trim()) {
      addTodo(text)
      setText('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default TodoInput
/*
useState('') — tracks what the user is typing locally
useTodoStore — grabs the addTodo action from the store
handleSubmit — checks the input isn't empty, calls addTodo, then clears the input
text.trim() — prevents adding empty or spaces-only todos
Notice: I'm using onClick on the button instead of a form onSubmit —both work fine, this is simpler.

*/