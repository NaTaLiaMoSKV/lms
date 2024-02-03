import { useState } from 'react';
import * as Yup from 'yup'
import Box from '@mui/material/Box';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Modal } from '@mui/material';
import { IoMdAdd } from "react-icons/io";

import AdminTable from '../AdminTable/AdminTable';
import teachersData from '../../../data/teachers.json'
import css from '../StudentsPage/StudentsPage.css'
import teachersCss from './TeachersPage.module.css'

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1.5px solid #000',
    boxShadow: 24,
    p: 4,
};

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
        <Box m={'20px'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                "& .MuiButtonBase-root": {
                    color: "#191d23",
                },
                margin: 0,
            }}
        >
            <div className='studentsTitleContainer'>
                <h1>Teachers</h1>
                <button onClick={handleOpenModal} className='addButton'>
                    <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                    Add new teacher
                </button>

                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={style}>
                        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Add new teacher</h1>
                         <Formik
                            initialValues={{ name: '', email: '', date: '', specialties: [] }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, isValid }) => (
                                <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                                    <div className={css.formInputContainer}>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            className='addStudentFormInput'
                                        />
                                        <ErrorMessage name="name" component="div" className={css.errorMessage} />
                                    </div>

                                    <div className={css.formInputContainer}>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            className='addStudentFormInput'
                                        />
                                        <ErrorMessage name="email" component="div" className={css.errorMessage} />
                                    </div>

                                    <div className={css.formInputContainer}>
                                        <Field
                                            type="date"
                                            id="date"
                                            name="date"
                                            placeholder="Date"
                                            className='addStudentFormInput'
                                        />
                                        <ErrorMessage name="date" component="div" className={css.errorMessage} />
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

                                    <button className='addStudentSubmitButton' disabled={isSubmitting || !isValid} type="submit">Submit</button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Modal>
            </div>

            <AdminTable data={teachersData} columns={teachersColumns} />
        </Box>
    );
}