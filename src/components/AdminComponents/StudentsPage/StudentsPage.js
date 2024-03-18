import { useState } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik';
import { Modal } from '@mui/material';
import { IoMdAdd } from "react-icons/io";

import AdminTable from '../AdminTable/AdminTable';
import studentsData from '../../../data/students.json'
import { FormBox, FormContainer, FormErrorMessage, FormInput, FormSubmitButton, OpenFormButton } from 'styles/Form.styled';
import { StyledBox } from '../AdminDashboard/AdminDashboard.styled';

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

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmit = (values) => {
        const birthDateObject = new Date(values.date);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDateObject.getFullYear();
        const currentDateTime = new Date().toString();
        
        console.log(values);
        console.log('Age:', age);
        console.log('Registration date:', currentDateTime);
        
        // Add student data to file
        handleCloseModal();
    }

    const studentsColumns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: true
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 250,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: '100',
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'registrationDate',
            headerName: 'Registration Date',
            type: 'date',
            width: 160,
            valueGetter: (params) => {
                const dateString = params.value;
                return new Date(dateString);
            }
        },
        {
            field: 'completedCourses',
            headerName: 'Completed Courses',
            width: 300,
            editable: false,
            sortable: false,
            valueGetter: (params) => {
                return params.value.toString().replace(/,/g, ', ');
            }
        }
    ];

    return (
        <StyledBox>
            <div>
                <h1>Students</h1>
                <OpenFormButton onClick={handleOpenModal}>
                    <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                    Add new student
                </OpenFormButton>

                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                >
                    <FormBox attr='400'>
                        <h1>Add new student</h1>
                         <Formik
                            initialValues={{ name: '', email: '', date: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <FormContainer>
                                <div>
                                    <FormInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                    />
                                    <FormErrorMessage name="name" component="div"/>
                                </div>
                                <div>
                                    <FormInput
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <FormErrorMessage name="email" component="div" />
                                </div>
                                <div>
                                    <FormInput
                                        type="date"
                                        id="date"
                                        name="date"
                                        placeholder="Date"
                                    />
                                    <FormErrorMessage name="date" component="div"/>
                                </div>
                                <FormSubmitButton type="submit">Submit</FormSubmitButton>
                            </FormContainer>
                        </Formik>
                    </FormBox>
                </Modal>
            </div>

            <AdminTable data={studentsData} columns={studentsColumns} />
        </StyledBox>
        
    );
}