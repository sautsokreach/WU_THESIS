import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { AuthContext } from "../../user/auth";
import axios from "axios";
import { Base_URL } from "../../../utils/globalConstantUtil";

function ProfileSettings() {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    user_id: currentUser.user_id,
    username: currentUser.username,
    email: currentUser.email,
    title: currentUser.title,
    place: currentUser.place,
    about: currentUser.about,
  });

  // Call API to update profile settings changes
  const updateProfile = async () => {
    // console.log(currentUser.user_id);
    try {
      localStorage.setItem("user", JSON.stringify(user));
      await axios.put(`${Base_URL}/api/editUser/${currentUser.user_id}`, user);
      dispatch(showNotification({ message: "Profile Updated", status: 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    // console.log(updateType);
    // console.log(value);

    setUser({ ...user, [updateType]: value });
    // console.log({ ...user, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Name"
            defaultValue={currentUser.username}
            updateFormValue={updateFormValue}
            updateType="username"
          />
          <InputText
            labelTitle="Email Id"
            defaultValue={currentUser.email}
            updateFormValue={updateFormValue}
            updateType="email"
          />
          <InputText
            labelTitle="Title"
            defaultValue={currentUser.title}
            updateFormValue={updateFormValue}
            updateType="title"
          />
          <InputText
            labelTitle="Place"
            defaultValue={currentUser.place}
            updateFormValue={updateFormValue}
            updateType="place"
          />
          <TextAreaInput
            labelTitle="About"
            defaultValue={currentUser.about}
            updateFormValue={updateFormValue}
            updateType="about"
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
