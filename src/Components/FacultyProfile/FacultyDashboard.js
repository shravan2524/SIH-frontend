import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import BasicTable from './BasicTable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function BasicTable1({ rows, rowHead }) {
	console.log(rows);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Publish Year</TableCell>
						<TableCell >Domain</TableCell>
						<TableCell >Journal/Conference</TableCell>
						<TableCell >Co - Authors</TableCell>
						<TableCell >Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell >{row.PublishYear}</TableCell>
							<TableCell >{row.Domain}</TableCell>
							<TableCell >{row.Journal}</TableCell>
							<TableCell >{row.CoAuthors}</TableCell>
							<TableCell >{row.Description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}



const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

function createData(Qualifications, Stream, Course, Institute, BoardUniversity, AdmissionYear, PassingYear, Percentage) {
	return { Qualifications, Stream, Course, Institute, BoardUniversity, AdmissionYear, PassingYear, Percentage };
}

function createData1(PublishYear, Domain, Journal, CoAuthors, Description) {
	return { PublishYear, Domain, Journal, CoAuthors, Description };
}

const rows = [
	createData('BE', 'Engineering', 'EXTC', 'VIT', 'MU', '14/07/2019', '14/06/2023', 82),
	createData('BE', 'Engineering', 'EXTC', 'VIT', 'MU', '14/07/2019', '14/06/2023', 82),
	createData('BE', 'Engineering', 'EXTC', 'VIT', 'MU', '14/07/2019', '14/06/2023', 82),
	createData('BE', 'Engineering', 'EXTC', 'VIT', 'MU', '14/07/2019', '14/06/2023', 82),
];

const rows1 = [
	createData1('2016', 'Machine Learning', 'IEEE INDICON', 'XYZ, ABC', 'fsfksjdgjnfdkgnsidkfndsfidinfdisfnd'),
	createData1('2016', 'Machine Learning', 'IEEE INDICON', 'XYZ, ABC', 'fsfksjdgjnfdkgnsidkfndsfidinfdisfnd'),
	createData1('2016', 'Machine Learning', 'IEEE INDICON', 'XYZ, ABC', 'fsfksjdgjnfdkgnsidkfndsfidinfdisfnd'),
	createData1('2016', 'Machine Learning', 'IEEE INDICON', 'XYZ, ABC', 'fsfksjdgjnfdkgnsidkfndsfidinfdisfnd'),
];

function Detail({ data }) {
	console.log(data);
	return (
		<Box>
			{
				data.map((e) => {
					return (
						<Box>
							<Stack direction="row" spacing={1}>
								<Typography variant="h6" color="text.primary">{e.name} : </Typography>
								<Typography variant="h6" color="text.secondary">{e.value}</Typography>
							</Stack>
						</Box>
					)
				})
			}
		</Box>

	)
}

const rowHead = [
	'Qualifications', 'Stream', 'Course', 'Institute', 'BoardUniversity', 'AdmissionYear', 'PassingYear', 'Percentage'
]

export default function FacultyDashboard() {
	const [basicDetails, setbasicDetails] = useState([
		{
			name: "First Name", value: "Shravan"
		},
		{
			name: "Middle Name", value: "Shravan"
		},
		{
			name: "Last Name", value: "Shravan"
		}
	]);
	const [expanded, setExpanded] = React.useState(false);
	const [expanded2, setExpanded2] = React.useState(false);
	const [expanded3, setExpanded3] = React.useState(false);
	const [expanded4, setExpanded4] = React.useState(false);
	const [expanded5, setExpanded5] = React.useState(false);
	const [expanded6, setExpanded6] = React.useState(false);
	const [expanded7, setExpanded7] = React.useState(false);
	const [expanded8, setExpanded8] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	console.log(basicDetails);

	return (
		<Box style={{ width: "80%", margin: "10em auto" }}>
			<Card >
				<CardHeader
					title="Basic Details"
					action={
						<ExpandMore
							expand={expanded}
							onClick={(e) => setExpanded(!expanded)}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					}
				/>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						< Detail data={basicDetails} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Location Details"
					action={<ExpandMore
						expand={expanded2}
						onClick={(e) => setExpanded2(!expanded2)}
						aria-expanded={expanded2}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>}
				/>

				<Collapse in={expanded2} timeout="auto" unmountOnExit>
					<CardContent>
						< Detail data={basicDetails} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Demographic Details"
					action={<ExpandMore
						expand={expanded3}
						onClick={(e) => setExpanded3(!expanded3)}
						aria-expanded={expanded3}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>}
				/>
				
				<Collapse in={expanded3} timeout="auto" unmountOnExit>
					<CardContent>
						< Detail data={basicDetails} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Educational Details"
					action={
						<ExpandMore
					expand={expanded4}
					onClick={(e) => setExpanded4(!expanded4)}
					aria-expanded={expanded4}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
					}
				/>
				
				<Collapse in={expanded4} timeout="auto" unmountOnExit>
					<CardContent>
						<BasicTable rows={rows} rowHead={rowHead} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Experience Details"
					action={
						<ExpandMore
					expand={expanded5}
					onClick={(e) => setExpanded5(!expanded5)}
					aria-expanded={expanded5}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
					}
				/>
				
				<Collapse in={expanded5} timeout="auto" unmountOnExit>
					<CardContent>
						< Detail data={basicDetails} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Skills Details"
					action={<ExpandMore
						expand={expanded6}
						onClick={(e) => setExpanded6(!expanded6)}
						aria-expanded={expanded6}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>}
				/>
				
				<Collapse in={expanded6} timeout="auto" unmountOnExit>
					<CardContent>
						< Detail data={basicDetails} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Social media links"
					action={<ExpandMore
						expand={expanded7}
						onClick={(e) => setExpanded7(!expanded7)}
						aria-expanded={expanded7}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>}
				/>
				
				<Collapse in={expanded7} timeout="auto" unmountOnExit>
					<CardContent>
						< Detail data={basicDetails} />
					</CardContent>
				</Collapse>
			</Card>
			<Card >
				<CardHeader
					title="Papers Published Details"
					action={
						<ExpandMore
					expand={expanded8}
					onClick={(e) => setExpanded8(!expanded8)}
					aria-expanded={expanded8}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
					}
				/>
				
				<Collapse in={expanded8} timeout="auto" unmountOnExit>
					<CardContent>
						<BasicTable1 rows={rows1} rowHead={rowHead} />
					</CardContent>
				</Collapse>
			</Card>
		</Box>
	)
}
