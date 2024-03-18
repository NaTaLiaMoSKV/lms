import { useState } from "react";
import * as Yup from 'yup';
import { IoMdAdd } from "react-icons/io";
import { Modal } from "@mui/material";

import coursesData from '../../../data/courses.json'
import teachersData from '../../../data/teachers.json'

import { ErrorMessage, Field, Formik } from "formik";
import { ModalSelectField } from "../CoursesPage/CoursesPage.styled";
import { GroupForm,  GroupFormButtonsContainer, GroupFormWrapper } from "./GroupsPage.styled";
import StudentsForm from "./StudentsForm";
import { ActionFormButton, FormBox, FormErrorMessage, FormInput, FormSelect, OpenFormButton } from "styles/Form.styled";
import { StyledBox } from "../AdminDashboard/AdminDashboard.styled";

const specialties = ['Biology', 'English', 'Computer Science']

const groupValidationSchema = Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required('Required')
        .min(5, 'Please use 5 characters or more'),
    specialty: Yup.string().required('Required').oneOf(specialties, 'Select a valid specialty'),
    course: Yup.string().required('Required'),
    teacher: Yup.string().required('Required'),
    students: Yup.array().of(
        Yup.string().required('Required')
    ).min(1, 'Please add 1 student or more'),
    schedule: Yup.array().of(
        Yup.date().min(new Date(), 'Date and time must be in future')
    ),
});

const initialValues = {
    id: '', 
    title: '',
    specialty: '',
    course: '',
    teacher: '',
    students: [],
    schedule: [],
};

export default function GroupsPage() {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(null);

    const handleFormSelect = (values) => {
        const filteredTeachers = teachersData.filter((teacher) => teacher.specialty === values.specialty);
        const filteredCourses = coursesData.filter((course) => course.specialty === values.specialty);

        return (
             <GroupFormWrapper>
                <div>
                    <Field as={ModalSelectField}
                        value={values.course} name="course">
                        <option disabled value=''> Select course</option>
                        {filteredCourses.map((course, index) => (
                                <option key={index} value={course.value}>{course.courseTitle}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="course" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                </div>
                <div >
                    <Field as={FormSelect}
                        value={values.teacher}
                        placeholder="Select teacher"
                        name="teacher">  
                        <option disabled value=''> Select teacher</option>
                        {filteredTeachers.map((teacher, index) => (
                            <option selected={false} key={index} value={teacher.value}>{teacher.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="teacher" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                </div>
            </GroupFormWrapper>
        )
    }
    
    return (
        <StyledBox>
           <h1>Groups</h1>
            <OpenFormButton onClick={() => setOpenModal(true)}>
                <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                Add new group
            </OpenFormButton> 

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
            >
                <FormBox>
                    <h1>Add new group</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={groupValidationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ values, handleSubmit, isValid, setFieldValue }) => (
                            <GroupForm>
                                <GroupFormWrapper>
                                    <div>
                                        <FormInput
                                            type="text"
                                            value={values.title}
                                            id="title"
                                            name="title"
                                            placeholder="Title"
                                        />
                                        <ErrorMessage name="title" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                                    </div>
                                    <div>
                                        <Field as={FormSelect}
                                            value={values.specialty} name="specialty"
                                        >
                                            <option disabled value=''> Select specialty</option>
                                            <option value="Biology">Biology</option>
                                            <option value="English">English</option>
                                            <option value="Computer Science">Computer Science</option>
                                        </Field>
                                        <ErrorMessage name="specialty" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                                    </div>
                                </GroupFormWrapper>

                                {values.specialty !== '' && handleFormSelect(values)}
                                {values.specialty !== '' && values.teacher !== '' && values.course !== '' && !openForm && (
                                    <>
                                        <GroupFormButtonsContainer>
                                            <ActionFormButton type="button" onClick={() => setOpenForm('Student')}>Add students</ActionFormButton>
                                            <ActionFormButton type="button" onClick={() => setOpenForm('Schedule')}>Add schedule</ActionFormButton>
                                        </GroupFormButtonsContainer>
                                        <GroupFormButtonsContainer>
                                            <h1>Total students: {values.students.length > 0 ? values.students.length + 1 : 0}</h1>  
                                        </GroupFormButtonsContainer>
                                    </>
                                )}

                                {openForm === 'Student' && <StudentsForm onClose={() => setOpenForm(null)} students={values.students} setFieldValue={setFieldValue} />}                                 
                            </GroupForm>
                        )}
                    </Formik>
                </FormBox>
            </Modal>
        </StyledBox>
    )
}