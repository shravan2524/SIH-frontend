import { ThemeProvider } from "@mui/system";
import { globalTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import FacultyDashboard from "./Components/FacultyProfile/FacultyDashboard";
import ApplicationStatus from "./Components/Dashboard/ApplicationStatus";
import JobPosting from "./Components/jobPosting/JobPosting";
import FacultyProfile from "./Components/FacultyProfile/FacultyProfile";
import CollegeProfile from "./Components/collegeProfile/CollegeProfile";
import JobApplication from "./Components/jobApplication/JobApplication";
import College from "./Components/DisplayProfile/College";
import Faculty from "./Components/DisplayProfile/Faculty";
import SearchJobs from "./Components/searchJobs/SearchJobs";
import VerifyHei from "./Components/Dashboard/VerifyHei";
import Faqs from "./Pages/Faqs";
import { BaseTablesProvider } from "./context/baseTable";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./Components/Layout";
import DepartmentDetails from "./Components/Dashboard/DepartmentDetails";
import ShowPostings from "./Components/jobPosting/ShowPostings";
import ViewColleges from "./Components/Dashboard/ViewColleges";
import AddMembers from "./Components/collegeProfile/AddMembers";
import ReviewApplications from "./Components/collegeProfile/ReviewApplications";
import Verify from "./Pages/Verify";
import ChangePass from "./Pages/ChangePass";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
	return (
		<ThemeProvider theme={globalTheme}>
			<BaseTablesProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Landing />}></Route>
						<Route path="login" element={<Login />}></Route>
						<Route path="signup" element={<Signup />}></Route>
						<Route path="verifyEmail">
							<Route path=":uid" element={<Verify />}></Route>
						</Route>
						<Route path="changePass" element={<ChangePass />}></Route>
						<Route path="forgotpassword" element={<ForgotPassword />}></Route>
						<Route
							path="faculty"
							element={
								<ProtectedRoute role="User">
									<Layout role="User"></Layout>
								</ProtectedRoute>
							}
						>
							<Route path="jobs" element={<SearchJobs />}></Route>
							<Route path="profile" element={<FacultyProfile />}></Route>
							<Route path="viewProfile" element={<Faculty />}></Route>
							<Route
								path="applicationStatus"
								element={<ApplicationStatus />}
							></Route>
							<Route path="jobApplication">
								<Route path=":postingId" element={<JobApplication />}></Route>
							</Route>
						</Route>

						<Route
							path="hei"
							element={
								<ProtectedRoute role="HEI">
									<Layout role="HEI"></Layout>
								</ProtectedRoute>
							}
						>
							<Route path="profile" element={<CollegeProfile />}></Route>
							<Route path="viewProfile" element={<College />}></Route>
							<Route path="postJob" element={<JobPosting />}>
								<Route path=":postingId" element={<JobPosting />}></Route>
							</Route>
							<Route path="reviewApplication">
								<Route path=":id" element={<ReviewApplications />}></Route>
							</Route>
							<Route path="deptDetails" element={<DepartmentDetails />}></Route>
							<Route path="viewPostings" element={<ShowPostings />}></Route>
							<Route path="addMembers" element={<AddMembers />}></Route>
						</Route>
						<Route
							path="facultyDashboard"
							element={<FacultyDashboard />}
						></Route>

						<Route
							path="aicte"
							element={
								<ProtectedRoute role="AICTE-Admin">
									<Layout role="AICTE-Admin"></Layout>
								</ProtectedRoute>
							}
						>
							<Route path="viewHeis" element={<ViewColleges />}></Route>
							<Route path="verifyhei" element={<VerifyHei />}></Route>
						</Route>

						<Route path="searchJobs" element={<SearchJobs />}></Route>
						<Route path="faqs" element={<Faqs />}></Route>
					</Routes>
				</BrowserRouter>
			</BaseTablesProvider>
		</ThemeProvider>
	);
}
export default App;

