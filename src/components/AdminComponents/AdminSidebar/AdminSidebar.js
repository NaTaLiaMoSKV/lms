import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { AdminImage, SidebarAdminContainer, SidebarAdminJob, SidebarAdminName, SidebarAdminText, SidebarAdminWrapper, StyledNavLink } from './AdminSidebar.styled';

import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";
import { PiChalkboardTeacherLight, PiStudentLight } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiHome4Line } from "react-icons/ri";

import userImage from '../../../images/user1.jpg'


export default function AdminSidebar() {
    const [toggled, setToggled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const adminName = 'Natalia';

    useEffect(() => {
        document.body.classList.add('sidebar-open');
    }, [])

    const handleCollapsedChange = (status) => {
        setCollapsed(!collapsed);
        document.body.classList.toggle('sidebar-open');
        // if (status === 'open') document.body.classList.add('sidebar-open');
        // else if (status === 'close') document.body.classList.remove('sidebar-open');
    };
    
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div>
            <Sidebar
                className={`app ${toggled ? "toggled" : ""}`}
                style={{
                    backgroundColor: '#fafafa',
                    height: "100%",
                    flexGrow: 1,
                }}
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
            >
                <main>
                    <Menu>
                        {collapsed ?(
                            <MenuItem
                                icon={<SlArrowRight />}
                                onClick={() => handleCollapsedChange('open')}
                                style={{  borderBottom: '1px solid #dcdcdc', height: '200px' }}
                            >
                            </MenuItem>
                        ) : (
                            <MenuItem
                                style={{borderBottom: '1px solid #dcdcdc', height: '200px', padding: '10px 20px' }}
                                suffix={<SlArrowLeft />}
                                onClick={() => handleCollapsedChange('close')}
                            >
                                <SidebarAdminText>LMS Admin</SidebarAdminText>
                                <SidebarAdminContainer>
                                    <SidebarAdminWrapper>
                                        <AdminImage src={userImage} alt='admin profile' />
                                    </SidebarAdminWrapper>
                                    <SidebarAdminName> {adminName}</SidebarAdminName>
                                    <SidebarAdminJob>administrator</SidebarAdminJob>
                                </SidebarAdminContainer>
                            </MenuItem>
                        )}
                    </Menu>

                    <Menu>
                        <StyledNavLink to='/home/admin/dashboard'>
                            <RiHome4Line />
                            <span>Dashboard</span>
                        </StyledNavLink>

                        <StyledNavLink to='/home/admin/courses'>
                            <TfiAgenda />
                            <span>Courses</span>
                        </StyledNavLink>

                        <StyledNavLink to='/home/admin/groups'>
                            <HiOutlineUserGroup />
                            <span>Groups</span>
                        </StyledNavLink>

                        <StyledNavLink to='/home/admin/students' >
                            <PiStudentLight />
                            <span>Students</span>
                        </StyledNavLink>

                        <StyledNavLink to='/home/admin/teachers'>
                            <PiChalkboardTeacherLight />
                            <span>Teachers</span>
                        </StyledNavLink>
                    </Menu>
                </main>
            </Sidebar>
        </div>
    )
}