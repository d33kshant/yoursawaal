import { useState } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import GroupsPage from './pages/GroupsPage'
import HomaPage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PostsPage from './pages/PostsPage'
import UsersPage from './pages/UsersPage'
import './styles/App.css'

function App() {

	const [user, setUser] = useState(null)

	const login = _user => setUser(_user)
	const logout = () => setUser(null)

	if (!user) {
		return (
			<AuthProvider value={{ user, login, logout }} >
				<Router>
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</Router>
			</AuthProvider>
		)
	}

	return (
		<AuthProvider value={{ user, login, logout }} >
			<Router>
				<Routes>
					<Route path='/' element={ <HomaPage/> } />
					<Route path='/posts' element={ <PostsPage /> } />
					<Route path='/groups' element={ <GroupsPage /> } />
					<Route path='/users' element={ <UsersPage /> } />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
