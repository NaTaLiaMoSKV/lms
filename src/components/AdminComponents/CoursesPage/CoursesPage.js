import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { Modal } from "@mui/material"
import { ErrorMessage, Field,  Formik } from "formik"
import { IoMdAdd } from "react-icons/io"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { CourseCard, CourseCardList, CourseCardSubtitle, CourseCardText, CourseCardTextWrapper, CourseCardTitle, ModalButtonsWrapper, ModalPageButton, ModalSectionItem, ModalSectionList, ModalSelectField } from "./CoursesPage.styled"

import coursesData from '../../../data/courses.json'
import SectionForm from "./SectionForm";
import { ActionFormButton, FormBox, FormContainer, FormErrorMessage, FormInput, FormSubmitButton, FormTextarea, OpenFormButton } from "styles/Form.styled";
import { StyledBox } from "../AdminDashboard/AdminDashboard.styled";

const specialties = ['Biology', 'English', 'Computer Science']

const firstValidationSchema = Yup.object().shape({
    courseTitle: Yup.string()
        .required('Required')
        .min(5, 'Please use 5 characters or more'),
    courseDescription: Yup.string()
        .required('Required')
        .min(15, 'Please use 15 characters or more'),
    specialty: Yup.string().required('Required').oneOf(specialties, 'Select a valid specialty'),
})

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
        }))
        .required('Required'),
});

const sectionFormInitialValues = { sectionId: '', sectionName: '', sectionDescription: '', sectionSummary: '' };

const initialValues = {
    courseTitle: '',
    courseDescription: '',
    specialty: '',
    courseSections: [
    ],
};

export default function CoursesPage() {
    const [openModal, setOpenModal] = useState(false);
    const [modalPage, setModalPage] = useState(1);
    const [sections, setSections] = useState([]);
    const [isFirstFormFieldValid, setIsFirstFormFieldValid] = useState(false);
    const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);
    const [sectionFormData, setSectionFormData] = useState(null);
    const navigate = useNavigate();

    const nextModalPage = () => setModalPage(modalPage => modalPage + 1);
    const prevModalPage = () => setModalPage(modalPage => modalPage - 1);

    const handleOpenModal = () => setOpenModal(true);
    
    const handleCloseModal = () => {
        setOpenModal(false);
        setIsFirstFormFieldValid(false);
        setModalPage(0);
        setSections([]); 
        setSectionFormData(null);
    };

    const formatTextString = (str, len) => {
        if (str.length <= len) {
            return str;
        }
        return str.substring(0, (len - 5)) + '...';
    }

    const addSection = (sectionValues) => {
        const existingIndex = sections.findIndex((section) => section.sectionId === sectionValues.sectionId);

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

    const deleteSection = (sectionId) => {
        setSections((prevSections) => prevSections.filter((section) => section.sectionId !== sectionId));
    }

    const handleCourseCardClick = (courseId) => {
        const selectedCourse = coursesData.find(course => course.id === courseId);
        navigate(`/home/admin/courses/${courseId}`, { state: { selectedCourse } });
    }

    return (
        <StyledBox>
            <h1>Courses</h1>
                <OpenFormButton onClick={handleOpenModal} className='addButton'>
                <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                Add new course
            </OpenFormButton>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
            >
                <FormBox attr='400'>
                    {modalPage === 0 && <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Add new course</h1>}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validate={(values) => {
                            firstValidationSchema
                                .validate({ courseTitle: values.courseTitle, courseDescription: values.courseDescription, specialty: values.specialty }, { abortEarly: true })
                                .then(() => setIsFirstFormFieldValid(true))
                                .catch(() => setIsFirstFormFieldValid(false))
                        }}>
                        {({ values, handleReset }) => (
                            <FormContainer
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const courseObject = {
                                        courseTitle: values.courseTitle,
                                        courseDescription: values.courseDescription,
                                        specialty: values.specialty,
                                        courseSections: [...sections]
                                    }
                                    console.log(courseObject);
                                    handleCloseModal();
                                    handleReset();
                                }}
                            >
                                {modalPage === 0 && (
                                    <>
                                        <div>
                                            <FormInput
                                                type="text"
                                                id="courseTitle"
                                                name="courseTitle"
                                                placeholder="Title"
                                            />
                                            <ErrorMessage name="courseTitle" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                                        </div>
                                        <div >
                                            <FormTextarea
                                                as='textarea'
                                                type="text"
                                                id="courseDescription"
                                                name="courseDescription"
                                                placeholder="Description"
                                            />
                                            <ErrorMessage name="courseDescription" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                                        </div>
                                        <div >
                                            <Field as={ModalSelectField} name="specialty">
                                                <option disabled value=''> Select specialty</option>
                                                <option value="Biology">Biology</option>
                                                <option value="English">English</option>
                                                <option value="Computer Science">Computer Science</option>
                                            </Field>
                                            <ErrorMessage name="specialty" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
                                        </div>
                                        
                                        {isFirstFormFieldValid && (
                                            <ModalButtonsWrapper style={{justifyContent: 'right'}}>
                                                <ModalPageButton type="button" onClick={nextModalPage}>
                                                    <HiChevronRight style={{ color: '#fff', width: '30px', height: '30px' }} />
                                                </ModalPageButton>
                                            </ModalButtonsWrapper>
                                        )}
                                    </>
                                )}
                                {modalPage === 1 && (
                                    <>
                                        {!sectionFormData && !isSectionFormOpen && (
                                            <>
                                                <h2 style={{marginBottom: '15px', textAlign: 'center' }}>Add sections for new course</h2>
                                                <OpenFormButton type='button' onClick={() => setIsSectionFormOpen(true)}>
                                                    <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                                                    Add new section
                                                </OpenFormButton>
                                                
                                                <ModalSectionList>
                                                    {sections.length > 0 && sections.map((section, index) => (
                                                        <ModalSectionItem key={index}>
                                                            <h3>{section.sectionName}</h3>
                                                            <div>
                                                                <ActionFormButton attr="change" type="button" onClick={() => setSectionFormData(section)}>change</ActionFormButton>
                                                                <ActionFormButton attr="delete" type="button" onClick={() => deleteSection(section.sectionId)}>delete</ActionFormButton>
                                                            </div>
                                                        </ModalSectionItem>
                                                    ))}
                                                </ModalSectionList>
                                            </>
                                        )}


                                        {/* ADD SECTION */}
                                        {isSectionFormOpen && <SectionForm title={'Add new section'} initialValues={sectionFormInitialValues} onSave={addSection} onClose={() => setIsSectionFormOpen(false)} />}

                                        {/* UPDATE SECTION */}
                                        {sectionFormData && <SectionForm title={'Update the section'} initialValues={sectionFormData} onSave={addSection} onClose={() => { setIsSectionFormOpen(false); setSectionFormData(null) }} />}
                                        
                                        <ModalButtonsWrapper style={{justifyContent: 'left'}}>
                                            <ModalPageButton type="button" onClick={prevModalPage}>
                                                <HiChevronLeft style={{ color: '#fff', width: '30px', height: '30px' }}/>
                                            </ModalPageButton>
                                        </ModalButtonsWrapper>
                                        {sections.length > 0 && <FormSubmitButton type="submit" >Submit</FormSubmitButton>}
                                        
                                    </>
                                )}
                            </FormContainer>
                        )}
                    </Formik>
                </FormBox>
            </Modal>
            <CourseCardList>
                {coursesData.map(course => (
                    <CourseCard key={course.id} $specialty={course.specialty} onClick={() => handleCourseCardClick(course.id)} >
                        <CourseCardTitle>{formatTextString(course.courseTitle, 50)}</CourseCardTitle>
                        <CourseCardSubtitle>{formatTextString(course.courseDescription, 60)}</CourseCardSubtitle>
                        <CourseCardTextWrapper>
                            <CourseCardText>{course.courseSections.length} sections</CourseCardText>
                            <CourseCardText>{formatTextString(course.specialty, 20)}</CourseCardText>
                        </CourseCardTextWrapper>
                        
                    </CourseCard>
                ))}
            </CourseCardList>
        </StyledBox>
    )
}