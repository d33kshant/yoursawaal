import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import TableCell from "../components/TableCell";
import TableRow from "../components/TableRow";

function UserPage() {

	const { id } = useParams()
	const [user, setUser] = useState({})

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch('/api/admin/get/users/'+id)
			const data = await response.json()
			if (data.error) return alert(data.error)
			setUser(data)
		}
		fetchUser()
	}, [])

	return (
		<>
			<NavBar />
			<div className="page-container">
				<Table>
					<TableRow>
						<TableCell head={true}>Key</TableCell>
						<TableCell head={true}>Value</TableCell>
					</TableRow>
					{ Object.entries(user).map((entry, index)=>{
						if (typeof entry[1] !== 'object')
						return (
							<TableRow key={index}>
								<TableCell>{entry[0]}</TableCell>
								<TableCell>{entry[1]}</TableCell>
							</TableRow>
						)
					}) }
				</Table>
			</div>
		</>
	)
}

export default UserPage