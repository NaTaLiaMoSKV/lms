import { Box } from "@mui/material";
import styled from "styled-components";

export const Dashboard = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: fixed;
`

export const DashboardContent = styled.div`
    width: calc(100vw - 85px);
    padding: 15px 30px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fafafa;
    flex: 1;
    overflow-y: scroll;

    body.sidebar-open & {
        width: calc(100vw - 255px);
    }
`

export const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    height: calc(100% - 30px);

    & .MuiButtonBase-root {
        color: #191d23;
    }
`;