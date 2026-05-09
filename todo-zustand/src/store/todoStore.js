import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTodoStore = create(
  persist(
    (set) => ({
      // State
      todos: [],

      // Actions
      addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
      })),

      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),

      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      }))
    }),
    {
      name: 'todo-storage' // saves to localStorage
    }
  )
)

export default useTodoStore
/*
todos: [] — starts as an empty list
addTodo — adds a new todo object with an id, text, and completed status
toggleTodo — flips completed true/false
removeTodo — removes a todo by id
clearCompleted — removes all completed todos
persist — automatically saves to localStorage so todos survive page refresh*/