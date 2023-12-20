import { useState } from 'react';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridToolbar } from '@mui/x-data-grid';
// import { randomId } from '@mui/x-data-grid-generator';

import studentsData from '../../../data/students.json'


const initialRows = studentsData;

// function EditToolbar(props) {
//     console.log(props);
//     const { setRows, setRowModesModel } = props;

//     const handleClick = () => {
//         const id = randomId();
//         setRows((oldRows) => [ { id, name: '', age: '', isNew: true }, ...oldRows ]);
//         setRowModesModel((oldModel) => ({
//             ...oldModel,
//             [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//         }));
//     };

//     return (
//         <GridToolbarContainer>
//             <Button startIcon={<AddIcon />} onClick={handleClick}>
//                 Add record
//             </Button>
//         </GridToolbarContainer>
//     );
// }

export default function StudentsPage() {
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: true
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 250,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: '100',
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'registrationDate',
            headerName: 'Registration Date',
            type: 'date',
            width: 160,
            valueGetter: (params) => {
                const dateString = params.value;
                return new Date(dateString);
            }
        },
        {
            field: 'completedCourses',
            headerName: 'Completed Courses',
            width: 300,
            editable: true,
            sortable: false,
            valueGetter: (params) => {
                return params.value.toString().replace(/,/g, ', ');
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        // className="textPrimary"
                        onClick={handleEditClick(id)}
                        // color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        // color="inherit"
                    />,
                    
                ];
            },
        },
    ];

    return (
        <Box m={'20px'}
            sx={{
                height: 500,
                "& .MuiButtonBase-root": {
                    color: "#191d23",
                },
            }}
        >
            <h1>Students</h1>
            {/* <EditToolbar /> */}
            {/* <h4>List of users registered in the system</h4> */}
            <DataGrid
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'name', sort: 'asc' }],
                    },
                    
                }}
                sx={{
                    boxShadow: 2,
                    border: 1,
                    borderColor: '#57707a'
                }}
                slots={{
                    toolbar: GridToolbar, 
                }}
                slotProps={{
                    toolbar: {
                        color: '#57707a'
                    }                    
                }}
                rows={rows}
                columns={columns}
                editMode="cell"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                // slots={{
                //     toolbar: EditToolbar,
                // }}
                // slotProps={{
                //     toolbar: { setRows, setRowModesModel },
                // }}
            />
        </Box>
    );
}