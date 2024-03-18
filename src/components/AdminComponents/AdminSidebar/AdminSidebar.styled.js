import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarTitleContainer = styled.div`
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
`

export const StyledNavLink = styled(NavLink)`
    color: #282828;
    text-decoration: none;
    display: flex;
    width: 230px;
    padding: 20px;

    & svg {
        margin: 0 10px;
        width: 20px;
        height: 20px;
    }

    &.active {
        color: #CB1A24;
    }

    &.active span {
        color: #CB1A24;
    }
`;

export const SidebarLogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #282828;
`

export const SidebarAdminContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SidebarAdminText = styled.h1`
    color: #282828;
    font-size: 15px;
    letter-spacing: 0.05em;
`

export const SidebarAdminName = styled.h2`
    margin: 10px 0;
    color: #282828;
    letter-spacing: 0.03em;
`

export const SidebarAdminJob = styled.p`
    color: #282828;
    font-size: 14px;
    letter-spacing: 0.03em;
`

export const SidebarAdminWrapper = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #28282890;
`

export const AdminImage = styled.img`
    width: 47px;
    height: 47px;
`
