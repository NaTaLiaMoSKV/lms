import AdminSidebar from "components/AdminSidebar/AdminSidebar";
import Header from "components/Header/Header";

export default function AdminDashboard() {
    return (
        <>
            <div style={{ display: 'flex', width: '100vw', height: '100vh'}}>
                <AdminSidebar  />
                <div style={{
                    backgroundColor: '#fafafa',
                    flex: 1,
                }}>
                    <Header />
                </div>
            </div>
            
        </>
    )   
}