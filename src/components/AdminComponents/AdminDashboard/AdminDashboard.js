import { useLocation, useParams } from "react-router-dom";
import AdminSidebar from "components/AdminComponents/AdminSidebar/AdminSidebar";
import StudentsPage from "../StudentsPage/StudentsPage";
import TeachersPage from "../TeachersPage/TeachersPage";
import CoursesPage from "../CoursesPage/CoursesPage";
import Course from "../CoursesPage/Course/Course";
import GroupsPage from "../GroupsPage/GroupsPage";
import { Dashboard, DashboardContent } from "./AdminDashboard.styled";
export default function AdminDashboard( ) {
    const { pathname } = useLocation();
    // const { userType } = useParams();
    const { userType, courseId } = useParams();

    return (
        <Dashboard>
            <AdminSidebar />
            <DashboardContent>
                {(() => {
                    switch (pathname) {
                        case `/home/${userType}/dashboard`:
                            return (
                                <h1>DASHBOARD</h1>
                            );
                        case `/home/${userType}/courses`:
                            return (
                                <CoursesPage />
                            );
                        case `/home/${userType}/courses/${courseId}`:
                            return (
                                <Course />
                            );
                        case `/home/${userType}/groups`:
                            return (
                                <GroupsPage />
                            );
                        case `/home/${userType}/students`:
                            return (
                                <StudentsPage />
                            );
                        case `/home/${userType}/teachers`:
                            return (
                                <TeachersPage />
                            );
                        default:
                            return null; 
                    }
                })()}   
            </DashboardContent>
        </Dashboard>
    )   
}