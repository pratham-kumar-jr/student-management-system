import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar/SideBar";
import DashboardPage from "./Dashboard.page";
import RecordingsPage from "./Recordings.page";

interface Props {}

const MainApp: React.FC<Props> = (props) => {
	return (
		<>
			<div className="w-full fixed z-30">
				<NavBar />
				<Header />
			</div>
			<SideBar />
			<Switch>
				<Route path="/dashboard">
					<DashboardPage />
				</Route>
				<Route path="/recordings/batch/:batchNumber/lecture/:lectureNumber">
					<RecordingsPage />
				</Route>
			</Switch>
		</>
	);
};

MainApp.defaultProps = {};

export default React.memo(MainApp);
