import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function LoginPage() {

	const [state, setState] = useState({ email: '', password: '' })
	const { login } = useContext(AuthContext)

	const onFormSubmit = async event => {
		event.preventDefault()
		const response = await fetch('/api/admin/login', {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(state)
		})
		const data = await response.json()
		if (data.error) {
			return alert(data.error)
		}
		localStorage.setItem('token', data.token)
		login({ token: data.token })
	}

	const onInputChange = (key, value) => {
		const newState = { ...state }
		newState[key] = value
		setState(newState)
	}

	return (
		<div className="login-page-container">
			<form onSubmit={onFormSubmit}>
				<input type="email" name='email' value={state.email} onChange={event=>onInputChange('email', event.target.value)} />
				<input type="password" name='password' value={state.password} onChange={event=>onInputChange('password', event.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default LoginPage