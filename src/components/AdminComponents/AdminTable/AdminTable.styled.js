import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.75;
    letter-spacing: 0.02857em;
`;

export const Th = styled.th`
    background-color: #282828;
    color: #fafafa;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0.07em;
`;

export const Td = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
`;

export const Tr = styled.tr`
    &:hover {
        background-color: #ececec;
        cursor:pointer;
    }
`

export const Li = styled.li`
    margin-bottom: 5px;
`;

export const TableButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
`

export const TableButton = styled.button`
    border: none;
    width: 30px;
    height: 30px;
    background-color: transparent;
    
    & svg {
        color: gray;
        transiton: color 250ms linear;
    }

    & svg:hover,
    & svg:focus {
        color: black;
    }
`