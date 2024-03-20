import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Professor_Schedule from "../../features/professorSchedule";
import ListProfessorSchedule from "../../features/listProfessorSchedule";

function InternalPage() {
  const dispatch = useDispatch();
  const [schedule,setSchedule]  = useState({id:'',schedule:{}})

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);
  const onClickSchedule = (param)=>{
    setSchedule({id:param.id,schedule:param.row.schedule})
  }

  return  <div> 
          <ListProfessorSchedule onClickSchedule={onClickSchedule} />
          <Professor_Schedule schedule={schedule} />
          </div>;
}

export default InternalPage;
