import { Field } from "formik";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const CourseContainer = styled.div`
    width: calc(100% - 40px);
    padding: 20px;
`

export const ReturnNavLink = styled(NavLink)`
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    background-color: transparent;
    text-decoration: none;
    color: inherit;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 4px;
    color: #191d23;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: rgba(25, 118, 210, 0.04);
    }

    &:active {
        background-color: #a0a0a0ce;
    }
`

export const ShowSectionFormButton = styled.button`
    border: none;
    width: 30px;
    height: 30px;
    
    & svg {
        color: gray;
        transiton: color 250ms linear;
    }

    & svg:hover,
    & svg:focus {
        color: black;
    }
`

export const ModalSectionWrapper = styled.div`
    display: flex;
    width: 360px;
    justify-content: space-between;
    align-items: center;
    background-color: #EEEEEE;
    padding: 10px;
    border-radius: 4px;

    & h3 {
        width: 240px;
    }
`

export const CourseFormInput = styled(Field)`
    width: 550px;
    padding: 8px;
    margin-top: 10px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    border-bottom: 1px solid #b1b5be;
    background-color: transparent;
    color: #282828;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.04em;
`

export const CourseFormTextarea = styled(Field)`
    min-width: 550px;
    max-width: 550px;
    padding: 8px;
    padding-bottom: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    border: 1px solid #b1b5be;
    border-radius: 5px;
    background-color: transparent;
    color: #282828;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.04em;
`

export const CourseSelectModal = styled.select`
    border: 1px solid black;
    background-color: none;
    width: 565px;
    padding: 8px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    border-bottom: 1px solid #b1b5be;
    background-color: transparent;
    color: #282828;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.04em;

    & option {
        font-size: 16px;
        letter-spacing: 0.08em;
    }
`

export const CourseSectionItem = styled.li`
    margin-bottom: 10px;
`