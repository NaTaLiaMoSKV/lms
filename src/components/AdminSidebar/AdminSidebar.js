import { useState } from 'react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import {
  RiHome4Line,
  RiTeamLine,
  RiCalendar2Line,
  RiFolder2Line,
  RiUserFollowLine,
  RiPlantLine,
  RiStackLine,
  RiUserUnfollowLine
} from "react-icons/ri";

export default function AdminSidebar() {
    const [toggled, setToggled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div>
        <Sidebar
            className={`app ${toggled ? "toggled" : ""}`}
            style={{
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
                            style={{ borderBottom: '1px solid #dcdcdc', height: '60px' }}
                            icon={<SlArrowRight />}
                            onClick={handleCollapsedChange}
                        ></MenuItem>
                    ) : (
                        <MenuItem
                            style={{borderBottom: '1px solid #dcdcdc', height: '60px'}}
                            suffix={<SlArrowLeft />}
                            onClick={handleCollapsedChange}
                        >
                            <div
                                style={{
                                    padding: "9px",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    letterSpacing: "1px"
                                }}
                            >
                                LOGO 
                            </div>
                        </MenuItem>
                    )}
                </Menu>

                <Menu>
                    <MenuItem icon={<RiHome4Line />}>Dashboard</MenuItem>
                    <SubMenu defaultOpen label={"Professors"} icon={<RiTeamLine />}>
                        <MenuItem icon={<RiUserFollowLine />}>Active </MenuItem>
                        <MenuItem icon={<RiUserUnfollowLine />}>Ex Professors</MenuItem>
                        <MenuItem icon={<RiCalendar2Line />}>Probation Period</MenuItem>
                    </SubMenu>
                    <SubMenu defaultOpen label={"Records"} icon={<RiFolder2Line />}>
                        <MenuItem icon={<RiStackLine />}>Senior Students</MenuItem>
                        <MenuItem icon={<RiPlantLine />}>Junior Students</MenuItem>
                    </SubMenu>
                </Menu>
            </main>
        </Sidebar>
    </div>
    )
}