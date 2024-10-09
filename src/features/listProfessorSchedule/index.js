import * as React from "react";
import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import SearchBar from "../../components/Input/SearchBar";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Base_URL } from "../../../src/utils/globalConstantUtil";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        professor_id: "",
        subject_id: "",
        semester: "",
        batch: "",
        year: "",
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        ADD RECORD
      </Button>
    </GridToolbarContainer>
  );
}

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
function getListProfessorSchedule(setRows) {
  axios.get(`${Base_URL}/api/professorSchedule`).then((res) => {
    setRows(
      res.data.map((item) => ({ ...item, id: item.professor_schedule_id }))
    );
  });
}
function ListProfessorSchedule({onClickSchedule}) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [professor, setProfessor] = useState([]);
  const [subject, setSubject] = useState([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(21),
    (val, index) => currentYear - 10 + index + " - " + (currentYear - 9 + index)
  );
  useEffect(() => {
    getListProfessorSchedule(setRows);
    axios.get(`${Base_URL}/api/professors`).then((res) => {
      setProfessor(res.data);
    });
    axios.get(`${Base_URL}/api/subjects`).then((res) => {
      setSubject(res.data);
    });
  }, []);

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
    axios.delete(`${Base_URL}/api/professorSchedule/${id}`).then((res) => {
      setRows(rows.filter((row) => row.id !== id));
    });
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

    if (isNaN(newRow.id)) {
      axios.post(`${Base_URL}/api/professorSchedule`, newRow).then((res) => {
        getListProfessorSchedule(setRows);
      });
    } else {
      axios.put(`${Base_URL}/api/professorSchedule/${newRow.id}`, newRow).then((res) => {
        getListProfessorSchedule(setRows);
      });
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const onclick = (GridRowParams) => {
    onClickSchedule(GridRowParams)
  };

  const columns = [
    {
      field: "professor_id",
      headerName: "Professor Name",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      type: "singleSelect",
      getOptionValue: (value) => value.professor_id,
      getOptionLabel: (value) => value.first_name + " " + value.last_name,
      valueOptions: professor,
    },
    {
      field: "subject_id",
      headerName: "Subject Name",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      type: "singleSelect",
      getOptionValue: (value) => value.subject_id,
      getOptionLabel: (value) => value.subject_name,
      valueOptions: subject,
    },
    {
      field: "semester",
      headerName: "Semester",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["1", "2"],
    },
    {
      field: "batch",
      headerName: "Batch",
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "year",
      headerName: "Year",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: years,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
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
      <div className="grid grid-cols-3 sm:grid-cols-3 "></div>
      <TitleCard title="List Professor Schedule" topMargin="mt-2">
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
            onRowClick={onclick}
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

export default ListProfessorSchedule;
