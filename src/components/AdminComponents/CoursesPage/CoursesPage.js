import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { Box, Modal } from "@mui/material"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { IoMdAdd } from "react-icons/io"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import css from '../StudentsPage/StudentsPage.css'
import { CourseCard, CourseCardList, CourseCardSubtitle, CourseCardText, CourseCardTextWrapper, CourseCardTitle, CoursesTitleContainer, CustomErrorMessage, ModalButtonsWrapper, ModalFormButton, ModalPageButton, ModalSectionItem, ModalSectionList, ModalSelectField } from "./CoursesPage.styled"

import coursesData from '../../../data/courses.json'
import SectionForm from "./SectionForm";

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
        // additionalMaterials: Yup.array()
        //     .of(Yup.string()),
        }))
        .required('Required'),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '80%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1.5px solid #000',
    boxShadow: 24,
    p: 4,
};

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
    const [modalPage, setModalPage] = useState(0);
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
        <>
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
                <CoursesTitleContainer>
                    <h1>Courses</h1>
                     <button onClick={handleOpenModal} className='addButton'>
                        <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                        Add new course
                    </button>

                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        
                        aria-labelledby="modal-modal-title"
                    >
                        <Box sx={style}>
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
                                    <Form
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
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                    >
                                        {modalPage === 0 && (
                                            <>
                                                <div className={css.formInputContainer}>
                                                    <Field
                                                        type="text"
                                                        id="courseTitle"
                                                        name="courseTitle"
                                                        placeholder="Title"
                                                        className='addStudentFormInput'
                                                    />
                                                    <ErrorMessage name="courseTitle" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>} />
                                                </div>
                                                <div className={css.formInputContainer}>
                                                    <Field
                                                        as='textarea'
                                                        type="text"
                                                        id="courseDescription"
                                                        name="courseDescription"
                                                        placeholder="Description"
                                                        className='addStudentFormTextarea'
                                                    />
                                                    <ErrorMessage name="courseDescription" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>} />
                                                </div>
                                                <div className={css.formInputContainer}>
                                                    <Field as={ModalSelectField} name="specialty">
                                                        <option disabled value=''> Select specialty</option>
                                                        <option value="Biology">Biology</option>
                                                        <option value="English">English</option>
                                                        <option value="Computer Science">Computer Science</option>
                                                    </Field>
                                                    <ErrorMessage name="specialty" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>} />
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
                                                        <h2>Add sections for new course</h2>
                                                        <button type='button' onClick={() => setIsSectionFormOpen(true)} className='addButton'>
                                                            <IoMdAdd style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                                                            Add new section
                                                        </button>
                                                        
                                                        <ModalSectionList>
                                                            {sections.length > 0 && sections.map((section, index) => (
                                                                <ModalSectionItem key={index}>
                                                                    <h3>{section.sectionName}</h3>
                                                                    <div>
                                                                        <ModalFormButton attr="change" type="button" onClick={() => setSectionFormData(section)}>change</ModalFormButton>
                                                                        <ModalFormButton attr="delete" type="button" onClick={() => deleteSection(section.sectionId)}>delete</ModalFormButton>
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
                                                {sections.length > 0 && <button className="addStudentSubmitButton" type="submit" >Submit</button>}
                                                
                                            </>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Modal>
                </CoursesTitleContainer>
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
        </Box>
        </>
    )
}