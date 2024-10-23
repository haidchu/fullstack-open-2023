import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'

import Login from './components/Login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
	const [message, setMessage] = useState('')

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

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

	const handleCreateBlog = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/api/blogs', {
				author: author,
				title: title,
				url: url
			}, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${user.token}`
				}
			})
			changeMessage(`a new blog ${title} by ${author} added`)

			const res = await axios.get('/api/blogs')
			setBlogs(res.data)
		} catch (err) {
			console.log(err)
			changeMessage(`something went wrong`)
		}
	}

	return (
		<div>
			{user === null ? (
				<Login setUser={setUser} message={message} setMessage={setMessage} />
			) : (
				<div>
					<h2>blogs</h2>
					<h1>{message}</h1>
					<label>
						{user.name} logged in
						<button onClick={handleLogout}>log out</button>
					</label>

					<h2>create new</h2>
					<form onSubmit={handleCreateBlog}>
						<div style={{
							display: 'flex',
							flexDirection: 'column'
						}}>
							<label>
								title:
								<input
									type='text'
									onChange={e => { setTitle(e.target.value) }} />
							</label>
							<label>
								author:
								<input
									type='text'
									onChange={e => { setAuthor(e.target.value) }} />
							</label>
							<label>
								url:
								<input
									type='text'
									onChange={e => { setUrl(e.target.value) }} />
							</label>
						</div>
						<div>
							<input type='submit' value='create' />
						</div>
					</form>

					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			)}
		</div>
	)
}

export default App