import * as React from 'react';
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import SelectBox from "../../components/Input/SelectBox";
import { showNotification } from "../common/headerSlice";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import SearchBar from "../../components/Input/SearchBar";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
    {
        id: randomId(),
        time: '08:00 - 11:00',
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        time: '14:00 - 17:00',
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        time: '17:30 - 20:00',
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    
];


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (

        <GridToolbarContainer>
            {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}> */}
            <Button color="primary" startIcon={<AddIcon />} >
                Submit
            </Button>
        </GridToolbarContainer>
    );
}

const listTeacher = [
  { name: "Chhun Vuth Chanraksmey", value: "1" },
];
const listSubject = [
  { name: "English for Communication I", value: "1" }
];

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Professor_Schedule() {
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

  const removeFilter = () => {
    setTrans(RECENT_TRANSACTIONS);
  };

  const applyFilter = (params) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return t.location == params;
    });
    setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
          field: 'time',
          headerName: 'Time',
          width: 150,
          align: 'left',
          headerAlign: 'left',
          type: 'singleSelect',
          valueOptions: ['08:00 - 11:00', '14:00 - 17:00', '17:30 - 20:30'],
      },
      {
          field: 'monday',
          headerName: 'Monday',
          width: 100,
          editable: true,
          type: 'boolean',
      },
      {
        field: 'tuesday',
        headerName: 'Tuesday',
        width: 100,
        editable: true,
        type: 'boolean',
      },
      {
        field: 'wednesday',
        headerName: 'Wednesday',
        width: 100,
        editable: true,
        type: 'boolean',
      },
      {
        field: 'thursday',
        headerName: 'Thursday',
        width: 100,
        editable: true,
        type: 'boolean',
      },
      {
        field: 'friday',
        headerName: 'Friday',
        width: 100,
        editable: true,
        type: 'boolean',
      },
      {
        field: 'saturday',
        headerName: 'Saturday',
        width: 100,
        editable: true,
        type: 'boolean',
      },
      {
        field: 'sunday',
        headerName: 'Sunday',
        width: 100,
        editable: true,
        type: 'boolean',
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
    <>
      <div className="grid grid-cols-3 sm:grid-cols-3 ">
        <SelectBox
          options={listTeacher}
          labelTitle="Period"
          placeholder="Select date range"
          containerStyle="w-72"
          labelStyle="hidden"
          defaultValue="TODAY"
        />
        <SelectBox
          options={listSubject}
          labelTitle="Period"
          placeholder="Select date range"
          containerStyle="w-72"
          labelStyle="hidden"
          defaultValue="TODAY"
        />
      </div>
      <TitleCard
        title="Professor Schedule"
        topMargin="mt-2"
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
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
        </div>
      </TitleCard>
    </>
  );
}

export default Professor_Schedule;
