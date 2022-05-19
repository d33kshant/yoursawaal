import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import TableCell from "../components/TableCell";
import TableRow from "../components/TableRow";

function GroupPage() {

	const { id } = useParams()
	const [group, setGroup] = useState({})

	useEffect(() => {
		const fetchGroup = async () => {
			const response = await fetch('/api/admin/get/groups/'+id)
			const data = await response.json()
			if (data.error) return alert(data.error)
			setGroup(data)
		}
		fetchGroup()
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
					{ Object.entries(group).map((entry, index)=>{
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

export default GroupPage