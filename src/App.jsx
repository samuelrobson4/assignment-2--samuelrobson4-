import { useState } from 'react'
import './App.css'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import checkIcon from './assets/check_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import TaskCounter from './components/TaskCounter'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const initialTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  let completedCount = 0
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) completedCount++
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    return task.completed
  })

  const handleAddTask = (text) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ])
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <img className="header-icon menu-icon" src={menuIcon} alt="Menu" />
          <form className="quick-find" onSubmit={(e) => e.preventDefault()}>
            <img className="header-icon search-icon" src={searchIcon} alt="" />
            <input type="text" id="quick-find" placeholder="Quick find" />
          </form>
        </div>
        <div className="header-counter">
          <img className="header-icon check-icon" src={checkIcon} alt="" />
          <TaskCounter total={tasks.length} completed={completedCount} />
        </div>
      </header>

      <div className="page-layout">
        <nav className="sidebar">
          <ul className="sidebar-list">
            <li>
              <a href="#">
                <img src={inboxIcon} alt="" />
                <span className="nav-label">Inbox</span>
                <span className="nav-count">5</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src={calendarIcon} alt="" />
                <span className="nav-label">Today</span>
                <span className="nav-count">5</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src={upcomingIcon} alt="" />
                <span className="nav-label">Upcoming</span>
              </a>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <section>
            <h1>Inbox</h1>

            <div className="task-filters">
              <button
                type="button"
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <span className="filter-sep">|</span>
              <button
                type="button"
                className={filter === 'active' ? 'active' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <span className="filter-sep">|</span>
              <button
                type="button"
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>

            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </section>
        </main>
      </div>
    </>
  )
}

export default App
