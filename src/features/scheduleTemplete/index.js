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
import { CommentsDisabledOutlined, CompareSharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";

function getListUniversity(setRows) {
  axios.get(`${Base_URL}/api/universities`).then((res) => {
    setRows(res.data.map((item) => ({ ...item, id: item.university_id })));
  });
}

export default function ScheduleTemplete({ data,resetInput }) {
  const dispatch = useDispatch();
  const [professor, setProfessor] = useState({});
  const [approverPreparer, setApproverPreparer] = useState([]);
  const [room, setRoom] = useState([]);
  const [subject, setSubject] = useState([]);
  const [shift, setShift] = useState({});
  const [professorSchedule, setProfessorSchedule] = useState([]);
  const [weekSchedule, setweekSchedule] = useState({});
  const [availableRoom, setAvailableRoom] = useState({
    // day: "",
    // shift: "",
    // date: "",
  });
  const [input, setInput] = useState({});
  const [subjectCode, setSubjectCode] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});




  const currentDate = new Date(); // C
  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };


  const workday = ['monday','tuesday','wednesday','thursday','friday']
  const weekendday = ['saturday','sunday']

  // Format the date using the specified options
  const currentLabel = currentDate.toLocaleDateString("en-US", options);
  useEffect(() => {
    setInput(data)
    axios.get(`${Base_URL}/api/getApproverPreparer`).then((res) => {
      //setProfessor(res.data);
      setApproverPreparer(res.data);
    });

    axios.get(`${Base_URL}/api/professorSchedule`).then((res) => {
      setProfessorSchedule(res.data);
    });
    workday.map((value)=>{
      handleRoomAvailable(value);
    })
    

    // axios.get(`${Base_URL}/api/rooms`).then((res) => {
    //   setRoom(res.data);
    // });

    axios.get(`${Base_URL}/api/subjects`).then((res) => {
      setSubject(res.data);
    });

    handleShift();
  }, [data]);

  const elementToPrintRef = useRef(null);

  const handleSave = () => {
     axios.post(`${Base_URL}/api/schedule`, input).then((res) => {
      console.log(res.data);
      for (let key in weekSchedule) {
        // Check if the property belongs to the object itself and not inherited
        const value = weekSchedule[key]
          axios.post(`${Base_URL}/api/createScheduleDay`, {schedule_id:res.data.schedule_id,room_id:value.room_id,subject_id:value.subject_id,professor_id:value.professor_id,weekDay:key}).then((res) => {
            dispatch(showNotification({ message: "Success", status: 1 }));
            resetInput()
          })
      }
     });
  };

  const onChangeDropdown = (e) => {
    console.log( e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.name + "_label"]: e.target.options[e.target.selectedIndex].text,
    });
    
  };

  const handleRoomAvailable = (weekday) => {
    const day = weekday;
    const shift = data.shift;
    const date = data.startTerm;
    const availableRoom = { day: day, shift: shift, date: date };

    console.log(availableRoom);

    axios
      .post(`${Base_URL}/api/getAvailableRoom`, availableRoom)
      .then((res) => {
        console.log(res.data);
        setRoom(res.data);
      });
  };

  const handleSubjectCode = (e) => {
    const { value, name } = e.target;
    const getSubject = subject.find(
      (item) => item.subject_id === parseInt(value)
    );
  
    // console.log(getSubject);
    // console.log(name);
    setSubjectCode({ ...subjectCode, [name]: getSubject.subject_code });


    setweekSchedule({...weekSchedule,[name]:{...weekSchedule[name],subject_id:value}})
    axios
      .post(`${Base_URL}/api/getAvailableProfessor`, {
        ...data,
        subject_id: getSubject.subject_id,
        weekDay: name,
      })
      .then((res) => {
        setProfessor({...professor,[name]:res.data});
      });
  };

  const handleProfessor = (e) => {
    const { value, name } = e.target;
    console.log(professor)
    const getProfessor = professor[name].find(
      (item) => item.professor_id === parseInt(value)
    );
  
    // console.log(getSubject);
    // console.log(name);
    setPhoneNumber({ ...phoneNumber, [name]: getProfessor.phone_number });


    setweekSchedule({...weekSchedule,[name]:{...weekSchedule[name],professor_id:value}})
  };

  const handleRoom = (e) => {
    const { value, name } = e.target;
    setweekSchedule({...weekSchedule,[name]:{...weekSchedule[name],room_id:value}})
  };

  function handleShift() {
    if (data?.shift === "morning") {
      setShift({ shift1: "8:00 to 9:30", shift2: "9:35 to 11:00" });
    } else if (data?.shift === "afternoon") {
      setShift({ shift1: "2:00 to 3:30", shift2: "3:35 to 5:00" });
    } else if (data?.shift === "evening") {
      setShift({ shift1: "5:30 to 7:30", shift2: "7:35 to 8:30" });
    }
  }

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
          <div
            className="scheduleContainer"
            style={{ background: "white", padding: "20px" }}
          >
            <div className="scheduleHeader">
              <h4 style={{ fontFamily: "KhmerOsMoulLight" }}>
                សកលវិទ្យាល័យ វេស្ទីន
              </h4>
              <h4>Academic {data.academic}</h4>
              <h4>Western University</h4>
            </div>

            <div className="scheduleUnderHeader">
              <img
                style={{ marginTop: "2px" }}
                src="https://media.licdn.com/dms/image/C4E22AQFEcsuyNeWRiQ/feedshare-shrink_800/0/1605667646490?e=2147483647&v=beta&t=aAH3Im3lA0ERpEBjnXf2snGnNvx6hmPWy3D8BpxfvZU"
                alt="Logo"
              />
              <div className="description">
                <h3>Faculty of {data.department_label} </h3>
              </div>
            </div>

            <div className="title">
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
                <td>{shift.shift1}</td>
                {workday.map((value,index)=> 
                <td rowSpan="2">
                  <div className="col">
                    <select
                      className="select select-bordered w-3/4"
                      name={value}
                      onChange={handleSubjectCode}
                    >
                      <option selected disabled value="Subject">
                        Subject
                      </option>
                      {subject.map((i) => (
                        <option value={i.subject_id}>{i.subject_name}</option>
                      ))}
                    </select>
                    <p>Code : {subjectCode[value]}</p>

                    <select
                      className="select select-bordered w-3/4"
                      name={value}
                      onChange={handleProfessor}
                    >
                      <option selected disabled value=" Professor">
                        Professor
                      </option>
                      {professor[value]?.map((i) => (
                        <option value={i.professor_id}>
                          {i.first_name} {i.last_name}
                        </option>
                      ))}
                    </select>
                    <p>{phoneNumber[value]}</p>

                    <select
                      className="select select-bordered w-3/4"
                      name={value}
                      onChange={
                        handleRoom
                      }
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))}
                    </select>
                  </div>
                </td>)}
              </tr>
              <tr>
                <td>{shift.shift2}</td>
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
                  <select
                    className="select none-bordered w-10/4"
                    name="approver"
                    onChange={onChangeDropdown}
                  >
                    <option selected disabled value=" Input Approver">
                      Input Approver
                    </option>
                    {approverPreparer.map(
                      (i) =>
                          <option value={i.professor_id}>
                            {i.first_name} {i.last_name}
                          </option>
                    )}
                  </select>
                </div>

                <div class="signatureButton">
                  <p>Prepared by</p>
                  <select
                    className="select none-bordered w-10/4"
                    name="preparer"
                    onChange={onChangeDropdown}
                  >
                    <option selected disabled value=" Input Preparer">
                      Input Preparer
                    </option>
                    {approverPreparer.map(
                      (i) =>
                          <option value={i.professor_id}>
                            {i.first_name} {i.last_name}
                          </option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <center>
          <button
            className=" btn px-6 btn-sm normal-case btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </center>
          </div>
      </div>
     
    </div>
  );
}
