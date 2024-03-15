import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";

const GenerateButtons = () => {
  const dispatch = useDispatch()

  const addNewTeamMember = () => {
     // dispatch(showNotification({message : "Add New Member clicked", status : 1}))
  }
  return(
      <div className="inline-block float-right">
          <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => addNewTeamMember()}>Generate Schedule</button>
      </div>
  )
};

function Transactions() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(21), (val, index) => currentYear - 10 + index);

  useEffect(()=>{
    const dateRangePickerEl = document.getElementById('dateRangePickerId');
    new DateRangePicker(dateRangePickerEl, {
        // options
    }); 
  })

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

  return (
    <>
      <TitleCard
        title="Generate Schedule"
        topMargin="mt-2"
      >
        <div className="grid grid-cols-3 gap-y-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Input Title"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Year</span>
            </div>
            <select className="select select-bordered">
                {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">University</span>
            </div>
            <select className="select select-bordered">
              <option disabled defaultValue>
                Toul Kork
              </option>
              <option>Toul Svay Prey</option>
              <option>KomPong Cham</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Batch</span>
            </div>
            <input
              type="text"
              placeholder="Input Title"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Semester</span>
            </div>
            <select className="select select-bordered">
              <option>
                1
              </option>
              <option>2</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Department</span>
            </div>
            <select className="select select-bordered">
              <option disabled defaultValue>
                Pick one
              </option>
              <option>Hotel & Tourism</option>
              <option>Teaching English</option>
              <option>English for Communication</option>
              <option>Computer Science</option>
              <option>Management</option>
              <option>Marketing</option>
              <option>Accounting</option>
              <option>Banking and Finance </option>
              <option>Law</option>
              <option>Engineering</option>
            </select>
          </label>
          <label className="form-control w-full  col-span-2">
            <div className="label w-full">
              <span className="label-text">Term</span>
            </div>
            <div id="dateRangePickerId" class="flex items-center">
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  name="start"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date start"
                />
              </div>
              <span class="mx-4 text-gray-500">to</span>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  name="end"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date end"
                />
              </div>
            </div>
          </label>
          <label className="form-control w-full max-w-xs col-span-1">
            <div className="label">
              <span className="label-text">Shift</span>
            </div>
            <select className="select select-bordered">
              <option disabled defaultValue>
                Pick one
              </option>
              <option>Morning</option>
              <option>AfterNoon</option>
              <option>Evening</option>
              <option>Weekend</option>
            </select>
          </label>
        </div>
        <div className="form-control w-full  col-span-3 items-center my-10">
            {GenerateButtons()}
        </div >
      </TitleCard>
    </>
  );
}

export default Transactions;
