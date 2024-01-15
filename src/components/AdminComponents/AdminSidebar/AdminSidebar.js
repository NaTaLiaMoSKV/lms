import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";
import { PiChalkboardTeacherLight, PiStudentLight } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiHome4Line } from "react-icons/ri";

import styled from 'styled-components';
import css from './AdminSidebar.module.css'
import userImage from '../../../images/user1.jpg'

const StyledNavLink = styled(NavLink)`
    color: ${props => (props.isActive ? '#CB1A24' : '#282828')};
    text-decoration: none;
    display: flex;
    width: 230px;
    padding: 20px;
`;

const StyledMenuItem = styled(MenuItem)`
    a.ps-menu-button {
        padding: 0;
        margin: 0;
        width: 250px;
    }
    .ps-menu-label {
        display: flex;
        align-items:center;
        height: 50px;
    }
`;

const StyledIcon = styled.span`
  color: ${props => (props.isActive ? '#CB1A24' : '#282828')};
`;


export default function AdminSidebar() {
    const [toggled, setToggled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    
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
                            <div className={css.headerMenuItem}>
                                <div className={css.headerContainer}>
                                    <h1 className={css.sidebarAdminText} >LMS Admin</h1>
                                </div>
                                <div className={css.sidebarAdminContainer}>
                                    <div className={css.sidebarAdminWrapper}>
                                        <img className={css.adminImage} src={userImage} alt='admin profile' />
                                    </div>
                                    <h2 className={css.sidebarAdminName}> {adminName}</h2>
                                    <p className={css.sidebarAdminJob}>administrator</p>
                                </div>   
                            </div>
                        </MenuItem>
                    )}
                </Menu>

                <Menu>
                    <StyledMenuItem>
                        <StyledNavLink to='/home/admin/dashboard' isActive={location.pathname === '/home/admin/dashboard'}>
                            <RiHome4Line style={{marginRight: '10px', marginLeft: '10px'}} />
                            <StyledIcon isActive={location.pathname === '/home/admin/dashboard'}>Dashboard</StyledIcon>
                        </StyledNavLink>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <StyledNavLink to='/home/admin/courses' isActive={location.pathname === '/home/admin/courses'}>
                            <TfiAgenda style={{marginRight: '10px', marginLeft: '10px'}} />
                            <StyledIcon isActive={location.pathname === '/home/admin/courses'}>Courses</StyledIcon>
                        </StyledNavLink>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <StyledNavLink to='/home/admin/groups' isActive={location.pathname === '/home/admin/groups'}>
                            <HiOutlineUserGroup style={{marginRight: '10px', marginLeft: '10px'}} />
                            <StyledIcon isActive={location.pathname === '/home/admin/groups'}>Groups</StyledIcon>
                        </StyledNavLink>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <StyledNavLink to='/home/admin/students' isActive={location.pathname === '/home/admin/students'}>
                            <PiStudentLight style={{marginRight: '10px', marginLeft: '10px'}} />
                            <StyledIcon isActive={location.pathname === '/home/admin/students'}>Students</StyledIcon>
                        </StyledNavLink>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <StyledNavLink to='/home/admin/teachers' isActive={location.pathname === '/home/admin/teachers'}>
                            <PiChalkboardTeacherLight style={{marginRight: '10px', marginLeft: '10px'}} />
                            <StyledIcon isActive={location.pathname === '/home/admin/teachers'}>Teachers</StyledIcon>
                        </StyledNavLink>
                    </StyledMenuItem>
                </Menu>
            </main>
        </Sidebar>
    </div>
    )
}