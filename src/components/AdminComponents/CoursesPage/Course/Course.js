import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from "@mui/material";
import { ErrorMessage, Field, Formik } from "formik";
import { IoMdAdd } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

import { CourseContainer, CourseSectionItem, ModalSectionWrapper, ReturnNavLink, ShowSectionFormButton } from "./Course.styled";
import SectionForm from "../SectionForm";
import { FormBox, FormContainer, FormErrorMessage, FormInput, FormSelect, FormSubmitButton, FormTextarea, OpenFormButton } from "styles/Form.styled";

const specialties = ['Biology', 'English', 'Computer Science'];

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
                    <FormContainer onSubmit={handleSubmit}>
                        <div>
                            <FormInput
                                type="text"
                                value={values.courseTitle}
                                id="courseTitle"
                                name="courseTitle"
                                placeholder="Title"
                            />
                            <ErrorMessage name="courseTitle" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                        </div>
                        <div>
                            <Field
                                as={FormTextarea}
                                type="text"
                                value={values.courseDescription}
                                id="courseDescription"
                                name="courseDescription"
                                placeholder="Description"
                            />
                            <ErrorMessage name="courseDescription" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                        </div>
                        <div>
                            <Field as={FormSelect}
                                value={values.specialty} name="specialty">
                                <option disabled value=''> Select specialty</option>
                                <option value="Biology">Biology</option>
                                <option value="English">English</option>
                                <option value="Computer Science">Computer Science</option>
                            </Field>
                            <ErrorMessage name="specialty" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                        </div>
                        <hr style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid grey' }} />
                        <OpenFormButton type='button' onClick={(e) => handleOpenModal(e)} style={{ marginBottom: '15px' }}>
                            <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                            Add new section
                        </OpenFormButton>

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
                                            <FormBox attr='400'>
                                                <SectionForm title={'Update the section'} initialValues={section} onSave={addSection} onClose={() => { setIsSectionFormOpen(false); setCurrentSection(null) }} />
                                            </FormBox>
                                        </Modal>
                                    )}
                                </CourseSectionItem>
                            ))}
                            {sections.length === 0 && <h3 style={{marginLeft: '15px'}}>0 sections</h3>}
                        </ul>
                        
                        {/* ADD SECTION */}
                        {isSectionFormOpen && !currentSection && (
                            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" >
                                <FormBox attr='400'>
                                    <SectionForm title={'Add new section'} initialValues={{ sectionId: '', sectionName: '', sectionDescription: '', sectionSummary: '' }} onSave={addSection} onClose={() => setIsSectionFormOpen(false)} />
                                </FormBox>
                            </Modal>
                        )}
                        
                        {isValid && sections.length > 0 && <FormSubmitButton type="submit">Save</FormSubmitButton>}
                    </FormContainer>
                )}
            </Formik>
        </CourseContainer>
    )
}