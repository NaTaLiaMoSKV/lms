import AdminDashboard from "components/AdminDashboard/AdminDashboard"
import StudentDashboard from "components/StudentDashboard/StudentDashboard"
import TeacherDashboard from "components/TeacherDashboard/TeacherDashboard"
import { useParams } from "react-router-dom"


export default function HomePage() {
    const { userType } = useParams();

    return (
        <>
            { userType === 'student' && <StudentDashboard />}
            { userType === 'teacher' && <TeacherDashboard />}
            { userType === 'admin' && <AdminDashboard />}
        </>
    )
}