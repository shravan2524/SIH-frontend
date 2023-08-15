import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { getData } from './data';
import CustomStatsToolPanel from "./customStatsToolPanel";
export const apiUrl = `${process.env.REACT_APP_BACK_URL}/api`;
import axios from "axios";
import { TextField, Button } from '@mui/material';
import './styleag.css';
import toast, { Toaster } from "react-hot-toast";

const palette = {
	blue: 'rgb(20,94,140)',
	lightBlue: 'rgb(182,219,242)',
	green: 'rgb(63,141,119)',
	lightGreen: 'rgba(75,168,142, 0.2)',
};
const columnFormatter = (params) => {
	const { yValue, highlighted } = params;
	if (highlighted) {
		return;
	}
	return { fill: yValue < 0 ? palette.lightBlue : palette.blue };
};

export default function AgGrid() {
	const gridRef = useRef();
	var ageType = 'everyone';
	const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
	const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
	const [rowData, setRowData] = useState();
	const [selected, setselected] = useState([]);
	const isRowMaster = useMemo(() => {
		return (dataItem) => {
			return dataItem ? dataItem.faculty.length > 0 : false;
		};
	}, []);

	const defaultColDef = useMemo(() => {
		return {
			sortable: true,
			resizable: true,
			filter: true,
			flex: 1,
			minWidth: 100,
			enableValue: true,
			enableRowGroup: true,
			enablePivot: true,
		};
	}, []);
	const onGridReady = useCallback((params) => {
		axios.get(`${apiUrl}/aicte/heiFaculty/`)
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


	const [columnDefs, setColumnDefs] = useState([
		// group cell renderer needed for expand / collapse icons
		{ field: 'instituteName', cellRenderer: 'agGroupCellRenderer', rowDrag: true },
		{ field: 'foundingYear' },
		{ field: 'registrationNumber' },
		{ field: 'regulatoryBody', valueFormatter: "x.toLocaleString() + 'm'" },
		{ field: 'country' },
		{ field: 'district' },
		{ field: 'state' },
	]);
	const onBtExport = useCallback(() => {
		gridRef.current.api.exportDataAsExcel();
	}, []);


	const detailCellRendererParams = useMemo(() => {
		return {
			detailGridOptions: {
				columnDefs: [
					{ field: 'department', cellRenderer: 'agGroupCellRenderer' },
					{ field: 'designation' },
					{ field: 'dob', minWidth: 150 },
					{ field: 'fullName' },
					{ field: 'qualification' },
					{ field: 'status' },
				],
				defaultColDef: {
					flex: 1,
				},
			},
			getDetailRowData: function (params) {
				params.successCallback(params.data.faculty);
			},
		};
	}, []);
	// Example of consuming Grid Event
	const cellClickedListener = useCallback(event => {
		console.log('cellClicked', event);
	}, []);

	const onFirstDataRendered = useCallback((params) => {
		// arbitrarily expand a row for presentational purposes
		setTimeout(function () {
			gridRef.current.api.getDisplayedRowAtIndex(1).setExpanded(true);
		}, 0);
	}, []);

	function CustomStatsToolPanel(props) {
		const [message, setmessage] = useState('');
		function not() {
			var selectedRows = gridRef.current.api.getSelectedRows();
			setselected(selectedRows);
			console.log(selectedRows);
			// if(selected.length==0){
			// 	toast.error("Please Select any College");
			// }
			if (!message) {
				toast.error("Please Enter Message")
			}
			else {
				const data = {
					message: message,
					heids: selectedRows,
				}
				axios.post(`${apiUrl}/university`, data)
					.then((e) => {
						console.log(e);
					})
					.catch((err) => {
						console.log(er);
					})
			}
		}
		return (

			<div style={{ textAlign: 'center', marginTop:"1rem" }}>
				<TextField id="outlined-basic" label="Write Your Message" variant="outlined" onChange={(e) => setmessage(e.target.value)} />
				<Button variant="contained" onClick={not}>Notify</Button>
			</div>
		);
	}

	const sideBar = useMemo(() => {
		return {
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
				{
					id: 'customStats',
					labelDefault: 'Custom Stats',
					labelKey: 'customStats',
					iconKey: 'custom-stats',
					toolPanel: CustomStatsToolPanel,
				},
			],
			defaultToolPanel: 'customStats',
		};
	}, []);

	const onSelectionChanged = useCallback(() => {
		var selectedRows = gridRef.current.api.getSelectedRows();
		setselected(selectedRows);
		console.log(selectedRows);
	}, []);

	return (
		<div>
			<div>
				<Toaster></Toaster>
				<div >
					<div className="ag-theme-alpine" style={{ width: "90%", height: 500, margin: "auto", marginTop: "5rem" }}>

						<AgGridReact
							ref={gridRef}
							rowData={rowData}
							masterDetail={true}
							isRowMaster={isRowMaster}
							columnDefs={columnDefs}
							defaultColDef={defaultColDef}
							detailCellRendererParams={detailCellRendererParams}
							rowSelection="multiple"
							rowDragManaged
							animateRows={true}
							onGridReady={onGridReady}
							onFirstDataRendered={onFirstDataRendered}
							onSelectionChanged={onSelectionChanged}
							sideBar={sideBar}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}