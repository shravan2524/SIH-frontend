/* eslint-disable */
import React, {
	useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import PdfPreviewer from './PdfPreviewer';
// import './styles.css';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { putData } from "../../bloc/common";
import { Button } from '@mui/material';
import axios from 'axios';

export const apiUrl = `${process.env.REACT_APP_BACK_URL}/api/hei`;
export const apiUrl1 = `${process.env.REACT_APP_BACK_URL}/api`;

const palette = {
	blue: 'rgb(20,94,140)',
	lightBlue: 'rgb(182,219,242)',
	green: 'rgb(63,141,119)',
	lightGreen: 'rgba(75,168,142, 0.2)',
};


function GetFilename(url) {
	return ('Auth Letter');
}

function DetailCellRenderer(props) {
	const { data } = props;
	const [selectedPreviewPdf, setSelectedPreviewPdf] = useState(null);
	const [availablePreviewPdf, setAvailablePreviewPdf] = useState([]);

	useEffect(() => {
		let valueArray = [];
		if (data.authLink) {
			const value = data.authLink;
			valueArray = value ? value.split(',') : [];
		}

		setAvailablePreviewPdf(valueArray);
	}, []);
	useEffect(() => {
		if (availablePreviewPdf[0]) {
			setSelectedPreviewPdf(availablePreviewPdf[0]);
		}
	}, [availablePreviewPdf]);

	return (
		<div className="container-fluid h-100 overflow-auto">
			<div className="d-flex justify-content-evenly align-items-center flex-wrap border-bottom">
				{availablePreviewPdf.map((link, i) => (
					<button type="button" onClick={() => setSelectedPreviewPdf(availablePreviewPdf[i])} key={i} className="btn btn-sm btn-link m-2 p-1">
						<small>
							(
							{i + 1}
							)
							{' '}
							{GetFilename(link)}
						</small>
					</button>
				))}
			</div>
			{availablePreviewPdf.length && (<PdfPreviewer />)}
		</div>
	);
}

const OnExpand = (i) => {
	i.node.setExpanded(!i.node.expanded);
};

export default function DemoPage() {
	const gridRef = useRef();
	const [databar, setdatabar] = useState({});
	const [visibility, setVisibility] = useState(false);
	const containerStyle = useMemo(
		() => ({ width: '100%', height: '600px' }),
		[],
	);
	const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
	const [rowData, setRowData] = useState();
	function verf(params) {
		console.log(params.data);
		params.data.isVerified = true;
		putData(`${apiUrl}/profile/${params.data._id}`)
			.then((val) => {
				console.log(val);
				window.location.reload();
				if (val) window.location.reload();
			})
			.finally(setVisibility(true));
	}
	const [columnDefs, setColumnDefs] = useState([
		{
			field: '',
			cellRenderer: (params) => (
				!params.data.isVerified
					? <Button aria-hidden="true" onClick={() => verf(params)} variant="contained">
						Verify
					</Button>
					: null
			),
			editable: false,
			filter: false,
			width: 100,
			minWidth: 100,
			maxWidth: 100,
		},
		{ field: 'instituteName', cellRenderer: 'agGroupCellRenderer', rowDrag: true },
		{ field: 'foundingYear' },
		{ field: 'registrationNumber' },
		{ field: 'regulatoryBody', valueFormatter: "x.toLocaleString() + 'm'" },
		{ field: 'country' },
		{ field: 'district' },
		{ field: 'state' },
	]);
	const [columns, setcolumns] = useState(columnDefs);
	const defaultColDef = useMemo(() => ({
		sortable: true,
		resizable: true,
		filter: true,
		flex: 1,
		minWidth: 100,
		enableValue: true,
		enableRowGroup: true,
		enablePivot: true,
	}), []);
	let c = 0;

	const onGridReady = useCallback((params) => {
		axios.get(`${apiUrl1}/aicte/heiFaculty/`)
			.then((e) => {
				console.log(e.data.data);
				// console.log(rowData);
				const data1 = [];
				e.data.data.map((e) => {
					let data2 = e.collegeData;
					data2.faculty = e.facultyData;
					data1.push(data2);
				})
				console.log(data1);
				setRowData(data1);
			})
			.catch((err) => {
				console.log(err);
			})
	}, []);

	const onFirstDataRendered = useCallback((params) => {
		//  gridRef.current.api.sizeColumnsToFit();
	}, []);

	const sideBar = useMemo(() => ({
		toolPanels: [
			{
				id: 'columns',
				labelDefault: 'Columns',
				labelKey: 'columns',
				iconKey: 'columns',
				toolPanel: 'agColumnsToolPanel',
			},
			{
				id: 'filters',
				labelDefault: 'Filters',
				labelKey: 'filters',
				iconKey: 'filter',
				toolPanel: 'agFiltersToolPanel',
			},
		],
		defaultToolPanel: 'customStats',
	}), []);

	const detailCellRenderer = useMemo(() => DetailCellRenderer, []);

	return (
		<div pageTitle="Demo">
			<div style={containerStyle}>
				<div className="ag-theme-alpine" style={{ width: "90%", height: 500, margin: "auto", marginTop: "5rem" }}>
					<AgGridReact
						ref={gridRef}
						rowData={rowData}
						columnDefs={columns}
						rowSelection="multiple"
						rowDragManaged
						defaultColDef={defaultColDef}
						animateRows={true}
						onGridReady={onGridReady}
						onFirstDataRendered={onFirstDataRendered}
						detailRowHeight={800}
						masterDetail
						detailCellRenderer={detailCellRenderer}
					/>
				</div>
			</div>
		</div>
	);
}
