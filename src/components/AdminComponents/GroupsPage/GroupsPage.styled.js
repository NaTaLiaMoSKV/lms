import styled from "styled-components";

export const GroupForm = styled.form`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;  
`
export const GroupFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const GroupFormButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    margin: 15px 0;
`

export const StudentFormList = styled.ul`
    max-height: 100px;
    overflow: auto;
    margin-bottom: 25px;
`

export const StudentFormItem = styled.li`
    border-bottom: 1px solid black;
    width: 346px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px 10px;
    margin: 10px 0 6px;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    transition: all 250ms linear;

    &[attr="selected"] {
        background-color: #bcbcbc;
    }
`

export const StudentFormButton = styled.button`
    height: 32px;
    width: 32px;
    border: none;
    background-color: #f0f0f0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
        color: gray;
        transiton: color 250ms linear;
    }

    & svg:hover,
    & svg:focus {
        color: black;
    }
`

export const ScheduleFormLabel = styled.label`
    margin-right: 8px;
    font-family: 'Roboto', sans-serif;
    color: #282828;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.04em;
`