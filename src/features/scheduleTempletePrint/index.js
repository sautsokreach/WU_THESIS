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

export default function ScheduleTempletePrint({ data ,isEdit}) {
  const [professor, setProfessor] = useState([]);
  const [room, setRoom] = useState([]);
  const [subject, setSubject] = useState([]);
  const [professorSchedule, setProfessorSchedule] = useState([]);
  const [availableRoom, setAvailableRoom] = useState({
    // day: "",
    // shift: "",
    // date: "",
  });
  
  const [shift, setShift] = useState({});
  const [input, setInput] = useState(data);
  const [subjectCode, setSubjectCode] = useState({});
  const [scheduleDay, setScheduleDay] = useState([]);

  const currentDate = new Date(); // C
  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const workday = ['monday','tuesday','wednesday','thursday','friday']
  const weekend = ['saturday','sunday']
  function handleShift() {
    if (data?.shift === "morning") {
      setShift({ shift1: "8:00 to 9:30", shift2: "9:35 to 11:00" });
    } else if (data?.shift === "afternoon") {
      setShift({ shift1: "2:00 to 3:30", shift2: "3:35 to 5:00" });
    } else if (data?.shift === "evening") {
      setShift({ shift1: "5:30 to 7:30", shift2: "7:35 to 8:30" });
    }
  }


  // Format the date using the specified options
  const currentLabel = currentDate.toLocaleDateString("en-US", options);
  useEffect(() => {
    if(data)
      axios.get(`${Base_URL}/api/ScheduleDays/${data.schedule_id}`).then((res) => {
        setScheduleDay(res.data);
        handleShift()
    });
    // axios.get(`${Base_URL}/api/professors`).then((res) => {
    //   setProfessor(res.data);
    // });

    // axios.get(`${Base_URL}/api/professorSchedule`).then((res) => {
    //   setProfessorSchedule(res.data);
    // });

    // // axios.get(`${Base_URL}/api/rooms`).then((res) => {
    // //   setRoom(res.data);
    // // });

    // axios.get(`${Base_URL}/api/subjects`).then((res) => {
    //   setSubject(res.data);
    // });
  }, [data]);
  const elementToPrintRef = useRef(null);
  const handlePrint = () => {
    console.log(input);
    const elementToPrint = elementToPrintRef.current;
    console.error(elementToPrint);
    if (elementToPrint) {
      const printWindow = window.open();
      printWindow.document.write(elementToPrint.innerHTML);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 200); // Trigger the print dialog
    } else {
      console.error("Element to print not found.");
    }
  };

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleRoomAvailable = (weekday) => {
   
  };

  const handleSubjectCode = (e) => {
    const { value, name } = e.target;
    const getSubject = subject.find(
      (item) => item.subject_id === parseInt(value)
    );
    // console.log(getSubject);
    // console.log(name);
    setSubjectCode({ ...subjectCode, [name]: getSubject.subject_code });

    const subjectDay = {
      subject1: "monday",
      subject2: "tuesday",
      subject3: "wednesday",
      subject4: "thursday",
      subject5: "friday",
      subject6: "saturday",
      subject7: "sunday",
    };

    axios
      .post(`${Base_URL}/api/getAvailableProfessor`, {
        ...data,
        subject_id: getSubject.subject_id,
        weekDay: subjectDay[name],
      })
      .then((res) => {
        setProfessor(res.data);
      });

      const day = subjectDay[name];
      const shift = data.shift;
      const date = formatDate(data.startTermLabel);
      setAvailableRoom({
        day: day,
        shift: shift,
        date: date,
      });
  
      console.log(availableRoom);
  
      axios
        .post(`${Base_URL}/api/getAvailableRoom`, availableRoom)
        .then((res) => {
          // console.log(res.data);
          // setRoom(res.data);
        });
  };

  return (
    <div>
      <div ref={elementToPrintRef}>
        <style>
          {`

            @font-face {
              font-family: 'KhmerOsMoulLight';
              src: url('/KhmerOSMuolLightRegular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
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
              
              .title h5 {
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
              
              .footerSchedule {
                
                line-height: 0.5;
                display: flex;
                flex-direction: column;
              }
              
              .scheduleTime,
              .signature {
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
              
              .term {
                max-width: 300px;
                width: 100%;
                font-size: 1rem;
              }
              .term > * {
                margin-bottom: 0;
                min-height: 20px;
                margin-top: 10px;
              }
              
              .signatureButton > p:first-child {
                padding-top: 20px;
                padding-bottom: 70px;
              } 
              
          `}{" "}
        </style>
        {data != null ? (
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
                <h3>Faculty of {data.department_name} </h3>
              </div>
            </div>

            <div className="title" >
              <h5>
                SCHEDULE OF YEAR {data.year} - SEMESTER {data.semester} -
                BATCH {data.batch}
              </h5>
              <p style={{lineHeight:"0.9"}}>
                {data.degree} Degree
              </p>
              <p style={{lineHeight:"0.9"}}>{data.major_name}</p>
              <p style={{lineHeight:"0.9"}}>
                Shift: {data.shift}
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
                {
                  workday.map((value,index)=> 
                  scheduleDay.filter((e)=> e.weekday == value ).length > 0 ?  (<td rowSpan="2">
                  <div className="col">
                    {isEdit ? 
                    (<select
                    className="select select-bordered w-3/4"
                    name="subject1"
                    onChange={handleSubjectCode}
                  >
                    <option selected disabled value=" Subject">
                      Subject
                    </option>
                    {subject.map((i) => (
                      <option value={i.subject_id}>{i.subject_name}</option>
                    ))}
                  </select>):(<p> {scheduleDay.find((e) => e.weekday == value ).subject_name}</p>) 
                    }
                    

                    <p>Code : {scheduleDay.find((e) => e.weekday == value ).subject_code}</p>
                    
                    {isEdit ? 
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
                    </select> : (<p> {scheduleDay.find((e) => e.weekday == value ).first_name} {scheduleDay.find((e) => e.weekday == value ).last_name}</p>)}
                    <p>Tel: {scheduleDay.find((e) => e.weekday == value ).phone_number}</p>

                    {isEdit ? 
                    <select
                      className="select select-bordered w-3/4"
                      name="room"
                      onClick={() => {
                        handleRoomAvailable("tuesday");
                      }}
                    >
                      <option selected disabled value=" Room">
                        Room
                      </option>
                      {/* {room.map((i) => (
                        <option value={i.room_id}>{i.room_number}</option>
                      ))} */}
                    </select> : (<p> {scheduleDay.find((e) => e.weekday == value ).room_number} </p>) }
                  </div>
                </td>):(<td  rowSpan="2"> Self Study</td>)
                  )
                }
              </tr>
              <tr>
                <td>{shift.shift2}</td>
              </tr>
            </table>
            <div class="footerSchedule">
              <div class="scheduleTime">
                <div class="term">
                  <p>Term starts on {(new Date(data.term_start).toLocaleDateString("en-US", {year: "numeric",month: "long", day: "numeric"}))}</p>
                  <p>Term ends on {(new Date(data.term_end).toLocaleDateString("en-US", {year: "numeric",month: "long", day: "numeric"}))}</p>
                </div>

                <div class="term">
                  <p>
                    This schedule is subject to change {data.startTermLabel}
                  </p>
                </div>
              </div>

              <div class="signature">
                <div class="signatureButton">
                  <p>Seen and Approved by</p>
                  {isEdit ? 
                  <input
                    onChange={onChangeInput}
                    name="approver"
                    type="text"
                    placeholder="Input Approver"
                    className="input input-bordered w-full max-w-xs"
                  />:  <p>{data.approver_name}</p> }
                </div> 

                <div class="signatureButton">
                  <p>Prepared by</p>
                  {isEdit ? 
                  <input
                    onChange={onChangeInput}
                    name="preparer"
                    type="text"
                    placeholder="Input Preparer"
                    className="input input-bordered w-full max-w-xs"
                  /> : <p>{data.preparer_name}</p> }
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
            onClick={handlePrint}
          >
            Print
          </button>
        </center>
      ) : (
        ""
      )}
    </div>
  );
}
