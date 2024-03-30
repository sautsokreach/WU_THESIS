import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
// import { Base_URL } from "../../../src/utils/globalConstantUtil";
import Axios from "axios";
import { AuthContext } from "../../user/auth";

function ProfileSettings() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.user_id);

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
    console.log(value);
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Name"
            defaultValue={currentUser?.username}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Email Id"
            defaultValue={currentUser?.email}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Title"
            defaultValue={currentUser?.title}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Place"
            defaultValue={currentUser?.place}
            updateFormValue={updateFormValue}
          />
          <TextAreaInput
            labelTitle="About"
            defaultValue={currentUser?.about}
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
