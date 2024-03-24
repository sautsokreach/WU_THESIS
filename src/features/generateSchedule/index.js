import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ScheduleTemplete from "../scheduleTemplete";
import axios from 'axios';
import { Base_URL } from '../../../src/utils/globalConstantUtil';
import Datepicker from "react-tailwindcss-datepicker";

function getListDepartment(setRows) {
  axios.get(`${Base_URL}/api/departments`)
    .then(res => {
      setRows(res.data)
    })
}

function GenerateSchedule() {
  const [data, setData] = useState(null)
  const [department, setDepartment] = useState([])
  const [input, setInput] = useState({})
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(21), (val, index) => ((currentYear - 10 + index) + " - " + (currentYear - 9 + index)));
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(input);
    setInput({ ...input, statTerm: newValue.startDate, endTerm: newValue.endDate });
    // updateDashboardPeriod(newValue)
  }

  useEffect(() => {
    getListDepartment(setDepartment)
  }, [])
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    console.log(input);
  };

  return (
    <>
      <TitleCard
        title="Generate Schedule"
        topMargin="mt-2"
      >
        <div className="grid grid-cols-3 gap-y-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              onChange={onChange}
              name='description'
              type="text"
              placeholder="Input Description"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Academic Year</span>
            </div>
            <select className="select select-bordered" name="academic" onChange={onChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">year</span>
            </div>
            <select className="select select-bordered" name="year" onChange={onChange}>
              <option value='1' >I</option>
              <option value='2' >II</option>
              <option value='3' >III</option>
              <option value='4' >IV</option>
              <option value='5' >V</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Batch</span>
            </div>
            <input
              type="number"
              name="batch"
              onChange={onChange}
              placeholder="Input Title"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Semester</span>
            </div>
            <select className="select select-bordered" name="semester" onChange={onChange}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Department</span>
            </div>
            <select className="select select-bordered" name="department" onChange={onChange}>
              {department.map((i) => (
                <option value={i.department_id}>{i.department_name}</option>
              ))}

            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Term</span>
            </div>
            <Datepicker
              containerClassName="w-72 "
              value={dateValue}
              theme={"light"}
              inputClassName="input input-bordered w-72"
              popoverDirection={"down"}
              toggleClassName="invisible"
              onChange={handleDatePickerValueChange}
              showShortcuts={true}
              primaryColor={"white"}
            />


          </label>
          <label className="form-control w-full max-w-xs col-span-1">
            <div className="label">
              <span className="label-text">Shift</span>
            </div>
            <select className="select select-bordered" name="shift" onChange={onChange}>
              <option value="morning">Morning</option>
              <option value="afterNoon">AfterNoon</option>
              <option value="evening">Evening</option>
              <option value="weekend">Weekend</option>
            </select>
          </label>
        </div>
        <div className="form-control w-full  col-span-3 items-center my-10">
          <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={()=>setData(input)}>Generate Schedule</button>
          </div>
        </div >
      </TitleCard>
      <br></br>

      <ScheduleTemplete data={data} />
    </>
  );
}

export default GenerateSchedule;
