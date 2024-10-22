import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/login', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setUser({
      name: res.data.name,
      username: res.data.username,
      token: res.data.token
    })
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form
          onSubmit={handleLogin}>
          <div>
            <label>Username:
              <input
                type="text"
                name='username'
                onChange={(e) => { setUsername(e.target.value) }} />
            </label>
            <label>Password:
              <input
                type="password"
                name='password'
                onChange={(e) => { setPassword(e.target.value) }} />
            </label>
          </div>
          <div>
            <input type="submit" value='Log in' />
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App