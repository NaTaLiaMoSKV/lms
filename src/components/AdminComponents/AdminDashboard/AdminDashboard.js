import { useLocation, useParams } from "react-router-dom";
import AdminSidebar from "components/AdminComponents/AdminSidebar/AdminSidebar";
import Header from "components/Header/Header";
import StudentsPage from "../StudentsPage/StudentsPage";
import TeachersPage from "../TeachersPage/TeachersPage";
import CoursesPage from "../CoursesPage/CoursesPage";
import Course from "../CoursesPage/Course/Course";
export default function AdminDashboard( ) {
    const { pathname } = useLocation();
    // const { userType } = useParams();
    const { userType, courseId } = useParams();

    return (
        <>
            <div style={{ display: 'flex', width: '100vw', height: '100vh', position: 'fixed'}}>
                <AdminSidebar  />
                <div className="content" style={{ backgroundColor: '#fafafa', flex: 1, overflowY: 'scroll' }}>
                    <Header />
                    {(() => {
                        switch (pathname) {
                            case `/home/${userType}/dashboard`:
                                return (
                                    <>
                                        <h1>DASHBOARD</h1>
                                    </>
                                );
                            case `/home/${userType}/courses`:
                                return (
                                    <>
                                        <CoursesPage />
                                    </>
                                );
                            case `/home/${userType}/courses/${courseId}`:
                                return (
                                    <>
                                        <Course />
                                    </>
                                );
                            case `/home/${userType}/groups`:
                                return (
                                    <>
                                        <h1>GROUPS</h1>
                                    </>
                                );
                            case `/home/${userType}/students`:
                                return (
                                    <>
                                        <StudentsPage />
                                    </>
                                );
                            case `/home/${userType}/teachers`:
                                return (
                                    <>
                                        <TeachersPage />
                                    </>
                                );
                            default:
                                return null; 
                        }
                    })()}   
                </div>
            </div>
            
        </>
    )   
}