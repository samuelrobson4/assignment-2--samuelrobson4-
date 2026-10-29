import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') return
    onAddTask(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm
