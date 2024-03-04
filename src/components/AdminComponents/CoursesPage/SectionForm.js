import { Field, ErrorMessage, useFormikContext } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import css from '../StudentsPage/StudentsPage.css'
import { CustomErrorMessage, ModalFormButton, ModalFormButtonsWrapper, SectionFormContainer } from './CoursesPage.styled';

const SectionForm = ({ title, onSave, onClose, initialValues }) => {
    const { values, setFieldValue } = useFormikContext();

    const sectionValidationSchema = Yup.object().shape({
        sectionId: Yup.string(),
        sectionName: Yup.string().required('Required').min(5, 'Please use 5 characters or more'),
        sectionDescription: Yup.string().required('Required').min(15, 'Please use 15 characters or more'),
        sectionSummary: Yup.string().required('Required'),
    });

    useEffect(() => {
        if (initialValues) {
            setFieldValue('sectionId', initialValues.sectionId);
            setFieldValue('sectionName', initialValues.sectionName);
            setFieldValue('sectionDescription', initialValues.sectionDescription);
            setFieldValue('sectionSummary', initialValues.sectionSummary);
        }
    }, [initialValues, setFieldValue]);

    const handleSave = () => {
        const sectionValues = {
            sectionId: values.sectionId,
            sectionName: values.sectionName,
            sectionDescription: values.sectionDescription,
            sectionSummary: values.sectionSummary
        };

        sectionValidationSchema
            .validate(sectionValues, { abortEarly: false })
            .then(() => {
                onSave(sectionValues);
            })
        onClose();
    };

    return (
        <SectionFormContainer>
            <h2 style={{ textAlign: 'center' }}>{title}</h2>
            <div className={css.formInputContainer}>
                <Field className='addStudentFormInput' type="text" id="sectionName" name="sectionName" placeholder="title"/>
                <ErrorMessage name="sectionName" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>}/>
            </div>
            <div className={css.formInputContainer}>
                <Field className='addStudentFormTextarea' as="textarea" id="sectionDescription" name="sectionDescription" placeholder="description"/>
                <ErrorMessage name="sectionDescription" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>}/>
            </div>
            <div className={css.formInputContainer}>
                <Field className='addStudentFormTextarea' as="textarea" id="sectionSummary" name="sectionSummary" placeholder="summary"/>
                <ErrorMessage name="sectionSummary" render={msg => <CustomErrorMessage>{msg}</CustomErrorMessage>}/>
            </div>
            
            <ModalFormButtonsWrapper>
                <ModalFormButton attr="save" type="button" onClick={handleSave} className='addButton'>Save</ModalFormButton>
                <ModalFormButton type="button" onClick={onClose} className='addButton'>Cancel</ModalFormButton>
            </ModalFormButtonsWrapper>
        </SectionFormContainer>
    );
};

export default SectionForm;
