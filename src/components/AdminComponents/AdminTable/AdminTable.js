import { useState } from 'react';
import { Formik } from 'formik';
import { Modal } from '@mui/material';
import * as Yup from 'yup';
import TableForm from './TableForm';
import { Table, Th, Td, Tr, TableButton, TableButtonsWrapper } from './AdminTable.styled';
import { FaPencil } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { FormBox } from 'styles/Form.styled';

const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required('Required')
        .min(5, 'Please use 5 characters or more'),
    email: Yup.string()
        .required('Required')
        .email('Invalid email address'),
});
 
export default function AdminTable({ data }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    const handleOpenModal = (row) => {
        setIsOpenModal(true);
        setCurrentRow(row);
    }
    
    const handleCloseModal = () => {
        setIsOpenModal(false);
        setCurrentRow(null);
    }

    const saveTableForm = values => {
        console.log(values);
    }

    const handleDeleteItem = (id) => {
        console.log(`Delete tem with id ${id}`)
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <Th>№</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th></Th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <Tr key={item.id}>
                            <Td>{index + 1}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.email}</Td>
                            <Td>
                                <TableButtonsWrapper>
                                    <TableButton type="button" onClick={() => handleOpenModal(item)}>
                                        <FaPencil />
                                    </TableButton>
                                    <TableButton type="button">
                                        <MdDelete style={{ width: '16px', height: '20px'}} onClick={() => handleDeleteItem(item.id)} />
                                    </TableButton>
                                </TableButtonsWrapper>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                open={isOpenModal && currentRow !== null}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
            >
                <FormBox attr='400'>
                    <Formik validationSchema={validationSchema} initialValues={currentRow}>
                        <TableForm title={'Update the data'} $initialvalues={currentRow} onSave={saveTableForm} onClose={() => handleCloseModal()} />
                    </Formik>
                </FormBox>
            </Modal>
        </>
    );
}