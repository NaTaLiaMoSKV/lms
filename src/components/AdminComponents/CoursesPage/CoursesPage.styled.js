import { styled } from "styled-components";

export const CourseCardList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 20px;
    gap: 30px;
`

export const CourseCard = styled.li`
    border-radius: 8px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    text-align: center;
    padding: 18px;
    width: 25%;
    -webkit-box-shadow: 3px 3px 4px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 3px 3px 4px 0px rgba(0,0,0,0.3);

    transition: transform 200ms linear;

    &:hover,
    &:focus {
        transform: scale(1.05);
        cursor: pointer;
    }

    ${props =>
        props.$specialty === 'Biology' &&
        `
            background-color: #E5E4E2;
    `}
    ${props =>
        props.$specialty === 'English' &&
        `
            background-color: #EBF4FA;
    `}
    ${props =>
        props.$specialty === 'Computer Science' &&
        `
            background-color: #E6E6FA;
    `}
`

export const CourseCardTitle = styled.h3`
    letter-spacing: 0.04em;
`

export const CourseCardSubtitle = styled.h4`
    margin-top: 8px;
    letter-spacing: 0.03em;
    color: #000000b8;
`

export const CourseCardText = styled.p`
    letter-spacing: 0.03em;
    font-size: 14px;
`

export const CourseCardTextWrapper = styled.div`
    display: flex;
    font-style: italic;
    margin-top: 10px;
    justify-content: space-between;
`

export const ModalButtonsWrapper = styled.div`
    display: flex;
    width: 350px;
    justify-content: space-between;    
`

export const ModalPageButton = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    opacity: 0.5;
    background: #a09d9d;
    transition: opacity 250ms linear;

    &:not(:disabled):hover {
        opacity: 1;
    }
`

export const ModalSelectField = styled.select`
    border: 1px solid black;
    background-color: none;
    width: 366px;
    padding: 8px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    border-bottom: 1px solid #b1b5be;
    background-color: transparent;
    color: #282828;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.04em;

    & option {
        font-size: 14px;
        letter-spacing: 0.08em;
    }
`

export const ModalSectionList = styled.ul`
    width: 100%;
    margin: 15px 0;
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-margin: 10px;

    &::-webkit-scrollbar {
        width: 10px;
        padding-left: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #888; 
        transition: background-color 0.3s linear;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555; 
    }

    & li:not(:last-child) {
        margin-bottom: 10px;
    }
`

export const ModalSectionItem = styled.li`
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

export const ModalFormButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 15px;
`

export const SectionFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    -webkit-box-shadow: 0px 0px 13px 1px rgba(173,171,173,1);
    -moz-box-shadow: 0px 0px 13px 1px rgba(173,171,173,1);
    box-shadow: 0px 0px 13px 1px rgba(173,171,173,1);
    padding: 15px;
    margin: 15px 0;
    height: calc(100% - 50px)
`
