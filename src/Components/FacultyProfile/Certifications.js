import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Certifications({handleNext}) {
	const [college, setcollege] = useState('');
	const [position, setposition] = useState("");
	const [description, setdescription] = useState('');

	function submit(){
		handleNext();
	}

	return (
		<Box sx={{ minWidth: 420 }}>
				<div> 
					 <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setcollege(e.target.value)} />
				</div>
				<div> 
					 <TextField id="outlined-basic" label="Company Name" variant="outlined" onChange={(e) => setposition(e.target.value)} />
				</div>
				<div> 
					 <TextField id="outlined-basic" label="/obtained date" type="date" variant="outlined" onChange={(e) => setdescription(e.target.value)} />
				</div>
				<Button variant="contained" onClick={submit}>Save and next</Button>
		</Box>
	);
}
