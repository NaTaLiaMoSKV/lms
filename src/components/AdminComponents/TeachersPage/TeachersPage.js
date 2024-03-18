import { useState } from 'react';
import * as Yup from 'yup'
import {Formik } from 'formik';
import { Modal } from '@mui/material';
import { IoMdAdd } from "react-icons/io";

import AdminTable from '../AdminTable/AdminTable';
import teachersData from '../../../data/teachers.json'
import teachersCss from './TeachersPage.module.css'
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
    specialties: Yup.array()
});

export default function TeachersPage() {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const specialtiesList = [
        'Mathematics',
        'Physics',
        'Chemistry',
        'English',
        'Biology',
    ];

    const handleSubmit = (values) => {
        const dropdown = document.querySelector('#specialtiesDropdown')
        const checkedInputs = dropdown.querySelectorAll('input[type="checkbox"]:checked');
        checkedInputs.forEach((input) => {
            values.specialties.push(input.value);
        });

        const birthDateObject = new Date(values.date);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDateObject.getFullYear();
        const currentDateTime = new Date().toString();

        console.log(values)
        console.log('Age:', age);
        console.log('Registration date:', currentDateTime);
        
        // Add teacher data to file
        handleCloseModal();
    }

    const teachersColumns = [
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
            field: 'specialty',
            headerName: 'Specialty',
            width: 150,
            editable: true
        },
        {
            field: 'startYear',
            headerName: 'Start year',
            type: 'number',
            width: '100',
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'totalCourses',
            headerName: 'Total courses',
            type: 'number',
            width: '100',
            align: 'left',
            headerAlign: 'left',
            editable: true
        },
        {
            field: 'currentCourses',
            headerName: 'Current courses',
            type: 'number',
            width: '100',
            align: 'left',
            headerAlign: 'left',
            editable: true
        },
    ];

    return (
        <StyledBox>
            <div>
                <h1>Teachers</h1>
                <OpenFormButton onClick={handleOpenModal}>
                    <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                    Add new teacher
                </OpenFormButton>

                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                >
                    <FormBox attr='400'>
                        <h1>Add new teacher</h1>
                         <Formik
                            initialValues={{ name: '', email: '', date: '', specialties: [] }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, isValid }) => (
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
                                        <FormErrorMessage name="date" component="div" />
                                    </div>
                                    <details className={teachersCss.multipleSelect}>
                                        <summary>Select specialties</summary>
                                        <div  id='specialtiesDropdown' className={teachersCss.multipleSelectDropdown}>
                                        {
                                            specialtiesList.map((el, index) => (
                                            <label key={index} >
                                                <input type="checkbox" hidden name="select" value={el} />
                                                <span className={teachersCss.content}>{el}</span>
                                            </label>
                                            ))
                                        }
                                        </div>
                                    </details>

                                    <FormSubmitButton disabled={isSubmitting || !isValid} type="submit">Submit</FormSubmitButton>
                                </FormContainer>
                            )}
                        </Formik>
                    </FormBox>
                </Modal>
            </div>

            <AdminTable data={teachersData} columns={teachersColumns} />
        </StyledBox>
    );
}