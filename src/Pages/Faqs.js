import React from 'react'
import Accordion from '@mui/material/Accordion';
import { Box } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const data = [
	{
		question: "What is Arohan? ",
		answer: "Arohan is an initiative of AICTE to help colleges, universities recruit faculties across pan India."
	},
	{
		question: "What is new in Arohan? ",
		answer: "The old school recruitment process has been replaced by a software-based recruitment process. "
	},
	{
		question: "Who can post jobs in Arohan?",
		answer: "All colleges and universities under AICTE can post jobs in Arohan."
	},
	{
		question: "Can a private college post jobs in Arohan ? ",
		answer: "Yes, private colleges under AICTE can post jobs in AICTE."
	},
	{
		question: "What is the role of AICTE?",
		answer: "AICTE acts as a regulatory body that will constantly monitor the hiring process."
	},
	{
		question: "Who can apply for jobs in Arohan?",
		answer: "Any individual who is a citizen of India and meets the given requirements can apply for jobs in Arohan."
	},
]

export default function Faqs() {
	return (
		<Box style={{ width: "80%", margin: "10em auto" }}>
			<Box>
				<Typography variant="h4">Frequently Asked Questions</Typography>
			</Box>
			{
				data.map((e) => {
					return (
						<Accordion style={{ padding: "0.5rem", margin: "1rem" }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>{e.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									{e.answer}
								</Typography>
							</AccordionDetails>
						</Accordion>
					)
				})
			}

		</Box>
	)
}
