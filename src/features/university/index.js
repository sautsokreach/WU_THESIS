import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TitleCard from "../../components/Cards/TitleCard"
import axios from 'axios';
import { Base_URL } from '../../../src/utils/globalConstantUtil'; 

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
  } from '@mui/x-data-grid-generator';
function getListUniversity(setRows){
    axios.get(`${Base_URL}/api/universities`)
    .then(res => {
        setRows(res.data.map((item) =>({...item,id:item.university_id})))
    })
}

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const id = randomId();
    const handleClick = () => {
         setRows((oldRows) => [...oldRows, { id, name_en: '', name_kh: '', website: '',location:'',logo: ''}]);
         setRowModesModel((oldModel) => ({
             ...oldModel,
             [id]: { mode: GridRowModes.Edit, fieldToFocus: 'first_name' },
         }));
    };

    return (

        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function University() {
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    useEffect(() => {
        getListUniversity(setRows)
      }, [])



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
        axios.delete(`${Base_URL}/api/deleteUniversity/${id}`)
        .then(res => {
            setRows(rows.filter((row) => row.id !== id));
        })
        
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
        console.log(isNaN(newRow.id))
        console.log(newRow.id)
        if( isNaN(newRow.id)){
            axios.post(`${Base_URL}/api/createUniversity`,newRow)
            .then(res => {
                getListUniversity(setRows)
            })
        }else{
                axios.put(`${Base_URL}/api/editUniversity/${newRow.id}`,newRow)
                .then(res => {
                    getListUniversity(setRows)
            })
        }
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow; 
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [
            { field: 'name_en', headerName: 'English Name', width: 200, editable: true },
            {
                field: 'name_kh',
                headerName: 'Khmer Name',
                width: 300,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'location',
                headerName: 'Location',
                width: 300,
                editable: true,
            },
            {
                field: 'website',
                headerName: 'Website',
                width: 200,
                editable: true,
            },
            {
                field: 'logo',
                headerName: 'Logo',
                width: 200,
                editable: true,
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
                                sx={{
                                    color: 'primary.main',
                                }}
                                onClick={handleSaveClick(id)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />,
                        ];
                    }
    
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                },
            },
        ];

    return (
        <TitleCard title="University" topMargin="mt-2" >
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
        </TitleCard>
    );
}
