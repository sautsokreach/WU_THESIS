import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Professor_Schedule from "../../features/Professor_Schedule";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Professor_Schedule" }));
  }, []);

  return <Professor_Schedule />;
}

export default InternalPage;
