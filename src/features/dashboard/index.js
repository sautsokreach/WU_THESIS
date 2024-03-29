import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useEffect, useState } from "react";
import { Base_URL } from "../../../src/utils/globalConstantUtil";
import axios from "axios";

function Dashboard() {
  const [professor, setProfessor] = useState([]);
  const [room, setRoom] = useState([]);
  const [subject, setSubject] = useState([]);
  const [professorSchedule, setProfessorSchedule] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${Base_URL}/api/professors`).then((res) => {
      setProfessor(res.data);
    });

    axios.get(`${Base_URL}/api/professorSchedule`).then((res) => {
      setProfessorSchedule(res.data);
    });

    axios.get(`${Base_URL}/api/rooms`).then((res) => {
      setRoom(res.data);
    });

    axios.get(`${Base_URL}/api/subjects`).then((res) => {
      setSubject(res.data);
    });
  }, []);

  //   console.log(professor, room, subject);

  function CountValue(value) {
    var length = 0;
    for (var key in value) {
      ++length;
    }
    //console.log(length);
    return length.toString();
  }

  const statsData = [
    {
      title: "Total Professors",
      value: CountValue(professor),
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "Current Professors",
    },
    {
      title: "Total Rooms",
      value: CountValue(room),
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          />
        </svg>
      ),
      description: "Current Rooms",
    },
    {
      title: "Total Subjects",
      value: CountValue(subject),
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      ),
      description: "Current Subjects",
    },
    // {
    //   title: "Active Users",
    //   value: "5.6k",
    //   icon: <UsersIcon className="w-8 h-8" />,
    //   description: "↙ 300 (18%)",
    // },
  ];

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div> */}

      {/** ---------------------- Different stats content 2 ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div> */}

      {/** ---------------------- User source channels table  ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels />
        <DoughnutChart />
      </div> */}
    </>
  );
}

export default Dashboard;
