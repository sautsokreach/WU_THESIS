// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const University = lazy(() => import("../pages/protected/University"));
const Department = lazy(() => import("../pages/protected/DepartmentDegree"));
const room = lazy(() => import("../pages/protected/Room"));
const ListSchedule = lazy(() => import("../pages/protected/ListSchedule"));
const Professor_Schedule = lazy(() =>
  import("../pages/protected/Professor_Schedule")
);
const Professor = lazy(() => import("../pages/protected/Professor"));
const Subject = lazy(() => import("../pages/protected/Subject"));
const Team = lazy(() => import("../pages/protected/Team"));
const GenerateSchedule = lazy(() =>
  import("../pages/protected/GenerateSchedule")
);
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/listSchedule",
    component: ListSchedule,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/professor",
    component: Professor,
  },
  {
    path: "/generateSchedule",
    component: GenerateSchedule,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/professorSchedule",
    component: Professor_Schedule,
  },
  {
    path: "/subject",
    component: Subject,
  },
  {
    path: "/room",
    component: room,
  },
  {
    path: "/university",
    component: University,
  },
  {
    path: "/faculties",
    component: Department,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
