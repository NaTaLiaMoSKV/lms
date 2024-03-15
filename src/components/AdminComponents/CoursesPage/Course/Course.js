import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Box, Modal } from "@mui/material";
import { ErrorMessage, Field, Formik } from "formik";
import { IoMdAdd } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

import { CourseContainer, CourseFormInput, CourseFormTextarea, CourseSectionItem, CourseSelectModal, ModalSectionWrapper, ReturnNavLink, ShowSectionFormButton } from "./Course.styled";
import SectionForm from "../SectionForm";

import { CustomErrorMessage } from "../CoursesPage.styled";
import css from '../../StudentsPage/StudentsPage.css'

const specialties = ['Biology', 'English', 'Computer Science'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '80%',
    bgcolor: 'background.paper',
    border: '1.5px solid #000',
    boxShadow: 24,
    p: 4,
};

const validationSchema = Yup.object().shape({
    courseTitle: Yup.string()
        .required('Required')
        .min(5, 'Please use 5 characters or more'),
    courseDescription: Yup.string()
        .required('Required')
        .min(15, 'Please use 15 characters or more'),
    specialty: Yup.string().required('Required').oneOf(specialties, 'Select a valid specialty'),
    courseSections: Yup.array()
        .of(Yup.object().shape({
        sectionId: Yup.string(),
        sectionName: Yup.string()
            .required('Required')
            .min(5, 'Please use 5 characters or more'),
        sectionDescription: Yup.string()
            .required('Required')
            .min(15, 'Please use 15 characters or more'),
        sectionSummary: Yup.string()
            .required('Required'),
        // additionalMaterials: Yup.array()
        //     .of(Yup.string()),
        }))
        .required('Required'),
});

export default function Course() {
    const { pathname, state } = useLocation();
    const { courseId } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [course, setCourse] = useState(state.selectedCourse);
    const [sections, setSections] = useState(state.selectedCourse.courseSections);

     useEffect(() => {
        setCourse(prevCourse => ({ ...prevCourse, courseSections: sections }));
     }, [sections]);
    
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentSection(null);
        setIsSectionFormOpen(false);
    };

    const handleOpenModal = e => {
        e.preventDefault();
        setOpenModal(true);
        setIsSectionFormOpen(true);
    };

    const showSectionForm = section => {
        if (!isSectionFormOpen) {
            setIsSectionFormOpen(true);
            setCurrentSection(section);
            setOpenModal(true);
        } else {
            setIsSectionFormOpen(false);
            setCurrentSection(null);
        }
    }

    const deleteSection = sectionId => {
        setSections((prevSections) => prevSections.filter((section) => section.sectionId !== sectionId));
        setCurrentSection(null);
    }

    const addSection = (sectionValues) => {
        const existingIndex = course.courseSections.findIndex((section) => section.sectionId === sectionValues.sectionId);

        if (existingIndex !== -1) {
            setSections((prevSections) => {
                const newSections = [...prevSections];
                newSections[existingIndex] = sectionValues;
                return newSections;
            });
        } else {
            const newSection = { ...sectionValues, sectionId: uuidv4() };
            setSections((prevSections) => [...prevSections, newSection]);
        }
        setIsSectionFormOpen(false);
    };

    return (
        <CourseContainer>
            <ReturnNavLink to={pathname.replace(`/${courseId}`, '')}>
                <GoArrowLeft style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                Return
            </ReturnNavLink>
            <Formik
                validationSchema={validationSchema}
                initialValues={course}
                onSubmit={(values) => {
                    setCourse(prevCourse => ({
                        courseTitle: values.courseTitle,
                        courseDescription: values.courseDescription,
                        specialty: values.specialty,
                        courseSections: [...prevCourse.courseSections, ...sections]
                    }));
                    console.log(course);
                    // SAVE THE COURSE
                    window.history.back();
                }}
            >
                {({ values, handleSubmit, isValid }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={css.formInputContainer}>
                            <CourseFormInput
                                type="text"
                                value={values.courseTitle}
                                id="courseTitle"
                                name="courseTitle"
                                placeholder="Title"
                            />
                            <ErrorMessage name="courseTitle" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>} />
                        </div>
                        <div className={css.formInputContainer}>
                            <Field
                                as={CourseFormTextarea}
                                type="text"
                                value={values.courseDescription}
                                id="courseDescription"
                                name="courseDescription"
                                placeholder="Description"
                            />
                            <ErrorMessage name="courseDescription" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>} />
                        </div>
                        <div className={css.formInputContainer}>
                            <Field as={CourseSelectModal}
                                value={values.specialty} name="specialty">
                                <option disabled value=''> Select specialty</option>
                                <option value="Biology">Biology</option>
                                <option value="English">English</option>
                                <option value="Computer Science">Computer Science</option>
                            </Field>
                            <ErrorMessage name="specialty" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>} />
                        </div>
                        <hr style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid gray' }} />
                        <button type='button' onClick={(e) => handleOpenModal(e)} className='addButton' style={{ marginBottom: '15px' }}>
                            <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                            Add new section
                        </button>

                        {/* SECTIONS */}
                        <ul>
                            {sections.length > 0 && sections.map((section, index) => (
                                <CourseSectionItem key={index}>
                                    <ModalSectionWrapper>
                                        <h3>{section.sectionName}</h3>
                                        <div>
                                            <ShowSectionFormButton onClick={() => showSectionForm(section)} type="button">
                                                <FaPencil />
                                            </ShowSectionFormButton>
                                            <ShowSectionFormButton onClick={() => deleteSection(section.sectionId)} type="button">
                                                <MdDelete style={{ width: '16px', height: '20px'}} />
                                            </ShowSectionFormButton>
                                        </div>
                                    </ModalSectionWrapper>
                                    
                                    {/* UPDATE SECTION */}
                                    {isSectionFormOpen && currentSection && currentSection.sectionId === section.sectionId && (
                                        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" >
                                            <Box sx={style}>
                                                <SectionForm title={'Update the section'} initialValues={section} onSave={addSection} onClose={() => { setIsSectionFormOpen(false); setCurrentSection(null) }} />
                                            </Box>
                                        </Modal>
                                    )}
                                </CourseSectionItem>
                            ))}
                            {sections.length === 0 && <h3 style={{marginLeft: '15px'}}>0 sections</h3>}
                        </ul>
                        
                        {/* ADD SECTION */}
                        {isSectionFormOpen && !currentSection && (
                            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" >
                                <Box sx={style}>
                                    <SectionForm title={'Add new section'} initialValues={{ sectionId: '', sectionName: '', sectionDescription: '', sectionSummary: '' }} onSave={addSection} onClose={() => setIsSectionFormOpen(false)} />
                                </Box>
                            </Modal>
                        )}
                        
                        {isValid && sections.length > 0 && <button type="submit" className="addStudentSubmitButton" style={{ marginTop: '10px' }}>Save</button>}
                    </form>
                )}
            </Formik>
        </CourseContainer>
    )
}