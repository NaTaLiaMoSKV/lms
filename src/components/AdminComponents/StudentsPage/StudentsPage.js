import { useState } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik';
import { Modal } from '@mui/material';
import { IoMdAdd } from "react-icons/io";

import AdminTable from '../AdminTable/AdminTable';
import studentsData from '../../../data/students.json'
import { FormBox, OpenFormButton } from 'styles/Form.styled';
import { StyledBox } from '../AdminDashboard/AdminDashboard.styled';
import TableForm from '../AdminTable/TableForm';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
        .min(5, 'Please use 5 characters or more'),
    email: Yup.string()
        .required('Required')
        .email('Invalid email address'),
    date: Yup.date()
        .required('Required')
        .min('1925-01-01', 'Date must be after 1925')
        .max(new Date('2010-12-31'), 'Date must be before 2010'),
});

export default function StudentsPage() {
    const [openModal, setOpenModal] = useState(false);

    const saveTableForm = (values) => {
        console.log(values);
    }

    return (
        <StyledBox>
            <div>
                <h1>Students</h1>
                <OpenFormButton onClick={() => setOpenModal(true)}>
                    <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                    Add new student
                </OpenFormButton>

                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-modal-title"
                >
                    <FormBox attr='400'>
                         <Formik
                            initialValues={{ name: '', email: '' }}
                            validationSchema={validationSchema}
                        >
                            <TableForm title='Add new student' $initialvalues={{ name: '', email: '' }} onSave={saveTableForm} onClose={() => setOpenModal(false)} />
                        </Formik>
                    </FormBox>
                </Modal>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'scroll', border: '0.5px solid #dedada' }}>
                <AdminTable data={studentsData} />
            </div>
        </StyledBox>
        
    );
}