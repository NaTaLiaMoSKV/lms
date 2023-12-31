import { useLocation, useParams } from "react-router-dom";
import AdminSidebar from "components/AdminComponents/AdminSidebar/AdminSidebar";
import Header from "components/Header/Header";
import StudentsPage from "../StudentsPage/StudentsPage";

export default function AdminDashboard({ section }) {
    const { pathname } = useLocation();
    const { userType } = useParams();

    return (
        <>
            <div style={{ display: 'flex', width: '100vw', height: '100vh'}}>
                <AdminSidebar  />
                <div className="content" style={{ backgroundColor: '#fafafa', flex: 1 }}>
                    <Header />
                    {(() => {
                        switch (pathname) {
                            case `/home/${userType}/dashboard`:
                                return (
                                <>
                                    {/* <Header /> */}
                                    <h1>DASHBOARD</h1>
                                </>
                                );
                            case `/home/${userType}/courses`:
                                return (
                                <>
                                    {/* <Header /> */}
                                    <h1>COURSE</h1>
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
                                <div >
                                    <StudentsPage />
                                </div>
                                );
                            case `/home/${userType}/teachers`:
                                return (
                                <>
                                        <h1>TEACHERS</h1>
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