import React from "react";
import { useSelector } from "react-redux";

import "./test.css";
import { Redirect } from "react-router";
import { TabView, TabPanel } from "primereact/tabview";
import { Calendar } from "primereact/calendar";

import UpdateGeneral from "../../components/updateGeneral/updateGeneral";
import UpdateSecurity from "../../components/updateSecurity/updateSecurity";
import SecurityQuestions from "../../components/security-questions/security-question.com";
import NewUser from "../../components/new-user/new-user.com";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <TabView activeIndex={1}>
      <TabPanel header="General">
        <div
          style={{
            display: "flow-root",
          }}
        >
          <UpdateGeneral
            field_title="User Name ID"
            field_name="username_id"
            field_value={currentUser.username_id}
          />
          <UpdateGeneral
            field_title="First Name"
            field_name="first_name"
            field_value={currentUser.first_name}
          />
          <UpdateGeneral
            field_title="Last Name"
            field_name="last_name"
            field_value={currentUser.last_name}
          />
        </div>
      </TabPanel>
      <TabPanel header="Security">
        <div
          style={{
            display: "flow-root",
          }}
        >
          <UpdateSecurity />
          <SecurityQuestions />
        </div>
      </TabPanel>
      <TabPanel header="New User" activeItem>
        <div
          style={{
            display: "flow-root",
          }}
        >
          <NewUser />
        </div>
      </TabPanel>
    </TabView>
  );
};

export default Dashboard;
