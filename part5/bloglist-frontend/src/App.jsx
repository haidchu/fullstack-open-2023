import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'

import Login from './components/Login'
import CreateBlogForm from './components/CreateBlog'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
	const [message, setMessage] = useState('')
	const [createBlogVisible, setCreateBlogVisible] = useState(false)

	useEffect(() => {
		const local = JSON.parse(localStorage.getItem('user'))
		setUser(local)
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	const changeMessage = (m) => {
		setMessage(m)
		setTimeout(() => {
			setMessage('')
		}, 500)
	}

	const handleLogout = () => {
		setUser(null)
		localStorage.clear()
	}

	const showWhenVisible = { display: createBlogVisible ? 'none' : '' }
	const hideWhenVisible = { display: createBlogVisible ? '' : 'none' }

	return (
		<div>
			{user === null ? (
				<Login
					setUser={setUser}
					message={message}
					setMessage={setMessage} />
			) : (
				<div>
					<h2>blogs</h2>
					<h1>{message}</h1>
					<label>
						{user.name} logged in
						<button onClick={handleLogout}>log out</button>
					</label>
					<div style={hideWhenVisible}>
						<CreateBlogForm
							user={user}
							message={message}
							setBlogs={setBlogs}
							setMessage={setMessage}
							setCreateBlogVisible={setCreateBlogVisible} />
						<button
							onClick={() => setCreateBlogVisible(false)}>cancel</button>
					</div>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
					<button
						style={showWhenVisible}
						onClick={() => { setCreateBlogVisible(!createBlogVisible) }}>new note</button>
				</div>
			)}
		</div>
	)
}

export default App