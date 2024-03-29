import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TitleCard from "../../components/Cards/TitleCard";
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
function getListUniversity(setRows) {
  axios.get(`${Base_URL}/api/universities`).then((res) => {
    setRows(res.data.map((item) => ({ ...item, id: item.university_id })));
  });
}

export default function ScheduleTemplete({ data }) {
  const [professor, setProfessor] = useState([]);
  const [room, setRoom] = useState([]);
  const [subject, setSubject] = useState([]);
  const [input,setInput] = useState(data);

  const currentDate = new Date(); // C
  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date using the specified options
  const currentLabel = currentDate.toLocaleDateString("en-US", options);
  useEffect(() => {
    axios.get(`${Base_URL}/api/professors`).then((res) => {
      setProfessor(res.data);
    });

    axios.get(`${Base_URL}/api/rooms`).then((res) => {
      setRoom(res.data);
    });

    axios.get(`${Base_URL}/api/subjects`).then((res) => {
      setSubject(res.data);
    });
  }, [data]);
  const elementToPrintRef = useRef(null);
  const handleSave = () => {
    console.log(input)
    // const elementToPrint = elementToPrintRef.current;
    // console.error(elementToPrint);
    // if (elementToPrint) {
    //   const printWindow = window.open();
    //   printWindow.document.write(elementToPrint.innerHTML);
    //   printWindow.document.close();
    //   setTimeout(() => printWindow.print(), 200); // Trigger the print dialog
    // } else {
    //   console.error("Element to print not found.");
    // }
  };

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div ref={elementToPrintRef}>
        <style>
          {`
            .scheduleContainer {
                display: flex;
                flex-direction: column;
              }
              
              .scheduleHeader {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
              
                border-bottom: 1px solid;
              }
              
              .scheduleHeader h4 {
                margin-top: auto;
                margin-bottom: 5px;
              }
              
              /* Body Schedule */
              .scheduleUnderHeader {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              
              .scheduleUnderHeader img {
                width: 100px;
              }
              
              .description {
                max-width: 500px;
                width: 350px;
                text-align: end;
              }
              
              /* Title */
              
              .title {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 10px;
              }
              
              .title h2 {
                margin: 5px;
              }
              
              .title p {
                margin-top: 2px;
                margin-bottom: 5px;
                font-size: 1rem;
              }
              
              /* Table */
              table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
                margin-right: 50px;
                margin-bottom: 5px;
              }
              td,
              th {
                border: 5px solid #dddddd;
                font-size: 0.8rem;
                text-align: center;
                width: 100px;
                max-width: 200px;
                padding: 10px;
              }
              td {
                height: 80px;
              }
              
              .col > * {
                padding: 5px;
                margin: 5px;
              }
              
              /* Footer */
              
              .footer {
                display: flex;
                flex-direction: column;
              }
              
              .scheduleTime,
              .signature {
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
              
              .term,
              .dateTime {
                max-width: 300px;
                width: 100%;
                font-size: 1rem;
              }
              .term > * {
                margin-bottom: 0;
              }
              
              .signatureButton > p:first-child {
                padding-bottom: 50px;
              }
              
          `}{" "}
        </style>
        {data != null ? (
          <div
            class="scheduleContainer"
            style={{ background: "white", padding: "20px" }}
          >
            <div class="scheduleHeader">
              <h4 style={{ fontFamily: "KhmerOsMoulLight" }}>
                សកលវិទ្យាល័យ វេស្ទីន
              </h4>
              <h4>Academic {data.academic}</h4>
              <h4>Western University</h4>
            </div>

            <div class="scheduleUnderHeader">
              <img
                style={{ marginTop: "2px" }}
                src="https://media.licdn.com/dms/image/C4E22AQFEcsuyNeWRiQ/feedshare-shrink_800/0/1605667646490?e=2147483647&v=beta&t=aAH3Im3lA0ERpEBjnXf2snGnNvx6hmPWy3D8BpxfvZU"
                alt="Logo"
              />
              <div class="description">
                <h3>{data.department_label} </h3>
              </div>
            </div>

            <div class="title">
              <h2>
                SCHEDULE OF YEAR {data.year_label} - SEMESTER {data.semester} -
                BATCH {data.batch}
              </h2>
              <p>
                <b>{data.major_set} Degree</b>
              </p>
              <p>{data.major_label}</p>
              <p>
                <b>Shift: {data.shift_label}</b>
              </p>
            </div>

            <table>
              <tr>
                <th>Date</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
              <tr>
                <td>8:00 to 9:30</td>
                <td rowSpan="2">
                  <div class="col">
                    <select
                      className="select select-bordered w-3/4"
                      name="subject"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Subject">
                        Subject
                      </option>
                      {subject.map((i) => (
                        <option value={i.subject_id}>{i.subject_name}</option>
                      ))}
                    </select>
                    <p>Finance Report Analysis</p>
                    <p>Code FIX10</p>
                    <select
                      className="select select-bordered w-3/4"
                      name="professor"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Professor">
                        Professor
                      </option>
                      {professor.map((i) => (
                        <option value={i.professor_id}>
                          {i.first_name} {i.last_name}
                        </option>
                      ))}
                    </select>
                    <p>Tel: 012548456</p>

                    <select
                      className="select select-bordered w-3/4"
                      name="room"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td rowSpan="2">
                <div class="col">
                    <select
                      className="select select-bordered w-3/4"
                      name="subject"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Subject">
                        Subject
                      </option>
                      {subject.map((i) => (
                        <option value={i.subject_id}>{i.subject_name}</option>
                      ))}
                    </select>
                    <p>Finance Report Analysis</p>
                    <p>Code FIX10</p>
                    <select
                      className="select select-bordered w-3/4"
                      name="professor"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Professor">
                        Professor
                      </option>
                      {professor.map((i) => (
                        <option value={i.professor_id}>
                          {i.first_name} {i.last_name}
                        </option>
                      ))}
                    </select>
                    <p>Tel: 012548456</p>

                    <select
                      className="select select-bordered w-3/4"
                      name="room"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td rowSpan="2">
                <div class="col">
                    <select
                      className="select select-bordered w-3/4"
                      name="subject"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Subject">
                        Subject
                      </option>
                      {subject.map((i) => (
                        <option value={i.subject_id}>{i.subject_name}</option>
                      ))}
                    </select>
                    <p>Finance Report Analysis</p>
                    <p>Code FIX10</p>
                    <select
                      className="select select-bordered w-3/4"
                      name="professor"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Professor">
                        Professor
                      </option>
                      {professor.map((i) => (
                        <option value={i.professor_id}>
                          {i.first_name} {i.last_name}
                        </option>
                      ))}
                    </select>
                    <p>Tel: 012548456</p>

                    <select
                      className="select select-bordered w-3/4"
                      name="room"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td rowSpan="2">
                <div class="col">
                    <select
                      className="select select-bordered w-3/4"
                      name="subject"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Subject">
                        Subject
                      </option>
                      {subject.map((i) => (
                        <option value={i.subject_id}>{i.subject_name}</option>
                      ))}
                    </select>
                    <p>Finance Report Analysis</p>
                    <p>Code FIX10</p>
                    <select
                      className="select select-bordered w-3/4"
                      name="professor"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Professor">
                        Professor
                      </option>
                      {professor.map((i) => (
                        <option value={i.professor_id}>
                          {i.first_name} {i.last_name}
                        </option>
                      ))}
                    </select>
                    <p>Tel: 012548456</p>

                    <select
                      className="select select-bordered w-3/4"
                      name="room"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td rowSpan="2">
                <div class="col">
                    <select
                      className="select select-bordered w-3/4"
                      name="subject"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Subject">
                        Subject
                      </option>
                      {subject.map((i) => (
                        <option value={i.subject_id}>{i.subject_name}</option>
                      ))}
                    </select>
                    <p>Finance Report Analysis</p>
                    <p>Code FIX10</p>
                    <select
                      className="select select-bordered w-3/4"
                      name="professor"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Professor">
                        Professor
                      </option>
                      {professor.map((i) => (
                        <option value={i.professor_id}>
                          {i.first_name} {i.last_name}
                        </option>
                      ))}
                    </select>
                    <p>Tel: 012548456</p>

                    <select
                      className="select select-bordered w-3/4"
                      name="room"
                      onChange={() => {}}
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>9:35 to 11:00</td>
              </tr>
            </table>
            <div class="footer">
              <div class="scheduleTime">
                <div class="term">
                  <p>Term starts on {data.startTermLabel}</p>
                  <p>Term ends on {data.endTermLabel}</p>
                </div>

                <div class="dateTime">
                  <p>
                    This schedule is subject to change {data.startTermLabel}
                  </p>
                </div>
              </div>

              <div class="signature">
                <div class="signatureButton">
                  <p>Seen and Approved by</p>
                  <input
                    onChange={onChangeInput}
                    name="approver"
                    type="text"
                    placeholder="Input Approver"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div class="signatureButton">
                  <p>Prepared by</p>
                  <input
                    onChange={onChangeInput}
                    name="preparer"
                    type="text"
                    placeholder="Input Preparer"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {data != null ? (
        <center>
          <button
            className=" btn px-6 btn-sm normal-case btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </center>
      ) : (
        ""
      )}
    </div>
  );
}
