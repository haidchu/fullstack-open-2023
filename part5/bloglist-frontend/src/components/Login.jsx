import { useState } from "react";
import axios from "axios";

const Login = ({ setUser, message, setMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const changeMessage = (m) => {
        setMessage(m)
        setTimeout(() => {
            setMessage('')
        }, 500)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/login', {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const user = {
                name: res.data.name,
                username: res.data.username,
                token: res.data.token
            }
            setUser(user)

            localStorage.setItem('user', JSON.stringify(user))
        } catch (err) {
            changeMessage('wrong username or password')
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <h1>{message}</h1>
            <form
                onSubmit={handleLogin}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
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

export default Login