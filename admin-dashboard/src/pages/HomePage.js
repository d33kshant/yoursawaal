import { Link } from 'react-router-dom'

function HomaPage() {
	return (
		<div className='home-page-container'>
			<Link to="/users">Users</Link>
			<Link to="/posts">Posts</Link>
			<Link to="/groups">Groups</Link>
		</div>
	)
}

export default HomaPage