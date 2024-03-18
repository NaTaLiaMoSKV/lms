import { Box } from "@mui/material";
import { Field, Form } from "formik";
import styled from "styled-components";

export const FormBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 80%;
    background-color: #fff;
    border: 1.5px solid #000;
    padding: 32px;

    box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    &[attr='400'] {
        width: 400px;
    }

    & h1 {
        margin-bottom: 20px;
        text-align: center;
    }
`

export const OpenFormButton = styled.button`
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding: 6px 8px;
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

export const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;
`

export const FormInput = styled(Field)`
    width: 350px;
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
`

export const FormTextarea = styled(Field)`
    width: 350px;
    max-width: 350px;
    padding: 8px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    border: 1px solid #b1b5be;
    border-radius: 5px;
    background-color: transparent;
    color: #282828;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.04em;

    &[attr='summary'] {
        height: 200px;
    }
`

export const FormSelect = styled.select`
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

export const FormErrorMessage = styled.div`
    color: #282828;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.04em;
    font-size: 14px;
`

export const ActionFormButton = styled.button`
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #e4e4e4;
    text-decoration: none;
    color: inherit;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 6px 8px;
    border-radius: 10px;
    color: #191d23;
    transition: all 25ms linear;

    &:hover {
        -webkit-box-shadow: 0px 0px 3px 1px rgba(173,171,173,1);
        -moz-box-shadow: 0px 0px 3px 1px rgba(173,171,173,1);
        box-shadow: 0px 0px 3px 1px rgba(173,171,173,1);
    }

    &[attr="save"] {
        background-color: #2eb82e90;
    }
    
    &[attr="submit"] {
        background-color: #2eb82e90;
        margin: 10px auto 0;
    }

    &[attr="change"] {
        background-color: #bfbfbf;
    }

    &[attr="delete"] {
        margin-top: 7px;
        background-color: #f1000075;
    }
`

export const FormSubmitButton = styled.button`
    width: 230px;
    height: 50px;
    margin: 10px auto 0;
    border: none;
    outline: none;
    background: #2f2f2f;
    color: #fff;
    font-size: 20px;
    letter-spacing: 0.05em;
    font-weight: 500;
    border-radius: 40px;
    text-align: center;
    box-shadow: 0 6px 20px -5px rgba(0,0,0,0.4);
    transition: all 0.3s linear;

    &:hover,
    &:focus {
        background: #636363;
    }
`
