import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import TableCell from "../components/TableCell";
import TableRow from "../components/TableRow";

function PostPage() {

	const { id } = useParams()
	const [post, setPost] = useState({})

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch('/api/admin/get/posts/'+id)
			const data = await response.json()
			if (data.error) return alert(data.error)
			setPost(data)
		}
		fetchPost()
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
					{ Object.entries(post).map((entry, index)=>{
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

export default PostPage