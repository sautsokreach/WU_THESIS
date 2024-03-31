import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ScheduleTemplete from "../scheduleTemplete";
import axios from "axios";
import { Base_URL } from "../../../src/utils/globalConstantUtil";
import Datepicker from "react-tailwindcss-datepicker";

function getListDepartment(setRows) {
  axios.get(`${Base_URL}/api/departments`).then((res) => {
    setRows(res.data);
  });
}

function GenerateSchedule() {
  const [data, setData] = useState(null);
  const [department, setDepartment] = useState([]);
  const [input, setInput] = useState({
    year: "1",
    year_label: "I",
    semester: "1",
    shift: "morning",
    shift_label: "Morning",
    startTerm: new Date(),
    endTerm: new Date(),
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(21),
    (val, index) => currentYear - 10 + index + " - " + (currentYear - 9 + index)
  );
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDatePickerValueChange = (newValue) => {
    const startDate = new Date(newValue.startDate); // Create a new Date object with the desired date
    const endDate = new Date(newValue.endDate); // C
    // Define options for formatting the date
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Format the date using the specified options
    const startLabel = startDate.toLocaleDateString("en-US", options);
    const endLabel = endDate.toLocaleDateString("en-US", options);
    setInput({
      ...input,
      startTerm: startDate,
      endTerm: endDate,
      startTermLabel: startLabel,
      endTermLabel: endLabel,
    });
    setDateValue(newValue);
    // updateDashboardPeriod(newValue)
  };

  useEffect(() => {
    getListDepartment(setDepartment);
  }, []);
  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onChangeDropdown = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.name + "_label"]: e.target.options[e.target.selectedIndex].text,
    });
  };

  const onChangeDropdownDataSet = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const set = selectedOption.dataset.set;
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.name + "_label"]: selectedOption.text,
      [e.target.name + "_set"]: set,
    });
  };

  return (
    <>
      <TitleCard title="Generate Schedule" topMargin="mt-2">
        <div className="grid grid-cols-3 gap-y-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              onChange={onChangeInput}
              name="description"
              type="text"
              placeholder="Input Description"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Academic Year</span>
            </div>
            <select
              className="select select-bordered"
              name="academic"
              onChange={onChangeDropdown}
            >
              <option selected disabled value="Please Select Academic">
                Please Select Academic
              </option>
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
            <select
              className="select select-bordered"
              name="year"
              onChange={onChangeDropdown}
            >
              <option value="1">I</option>
              <option value="2">II</option>
              <option value="3">III</option>
              <option value="4">IV</option>
              <option value="5">V</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Batch</span>
            </div>
            <input
              type="number"
              name="batch"
              onChange={onChangeInput}
              placeholder="Input Title"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Semester</span>
            </div>
            <select
              className="select select-bordered"
              name="semester"
              onChange={onChangeDropdown}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Faculty</span>
            </div>
            <select
              className="select select-bordered"
              name="department"
              onChange={onChangeDropdownDataSet}
            >
              <option selected disabled value="Please Select Faculty">
                Please Select Faculty
              </option>
              {department.map((i) => (
                <option data-set={i.department_name} value={i.department_id}>
                  {i.department_name}
                </option>
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
            <select
              className="select select-bordered"
              name="shift"
              onChange={onChangeDropdown}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">AfterNoon</option>
              <option value="evening">Evening</option>
              {/* <option value="weekend">Weekend</option> */}
            </select>
          </label>
          <label className="form-control w-full max-w-xs col-span-1">
            <div className="label">
              <span className="label-text">Major</span>
            </div>
            <select
              className="select select-bordered"
              name="major"
              onChange={onChangeDropdownDataSet}
            >
              <option selected disabled value="Please Select Major">
                Please Select Major
              </option>
              <option data-set="bachelor" value="1">
                Computer Science
              </option>
              <option data-set="bachelor" value="3">
                Computer Engineering
              </option>
              <option data-set="bachelor" value="4">
                Computer Design
              </option>
            </select>
          </label>
        </div>
        <div className="form-control w-full  col-span-3 items-center my-10">
          <div className="inline-block float-right">
            <button
              className="btn px-6 btn-sm normal-case btn-primary"
              onClick={() => setData(input)}
            >
              Generate Schedule
            </button>
          </div>
        </div>
      </TitleCard>
      <br></br>
      <ScheduleTemplete data={data} setInput={setInput} />
    </>
  );
}

export default GenerateSchedule;
