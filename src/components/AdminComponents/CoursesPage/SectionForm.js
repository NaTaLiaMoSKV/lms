import { ErrorMessage, useFormikContext } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { ModalFormButtonsWrapper, SectionFormContainer } from './CoursesPage.styled';
import { ActionFormButton, FormErrorMessage, FormInput, FormTextarea } from 'styles/Form.styled';

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
            setFieldValue('sectionId', initialValues.sectionId || ''); 
            setFieldValue('sectionName', initialValues.sectionName || '');
            setFieldValue('sectionDescription', initialValues.sectionDescription || '');
            setFieldValue('sectionSummary', initialValues.sectionSummary || '');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFieldValue]);

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
                onClose();
            });
    };

    return (
        <SectionFormContainer>
            <h2 style={{ textAlign: 'center' }}>{title}</h2>
            <div>
                <FormInput type="text" id="sectionName" name="sectionName" placeholder="title"/>
                <ErrorMessage name="sectionName" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>}/>
            </div>
            <div>
                <FormTextarea as="textarea" id="sectionDescription" name="sectionDescription" placeholder="description"/>
                <ErrorMessage name="sectionDescription" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>}/>
            </div>
            <div >
                <FormTextarea attr='summary' as="textarea" id="sectionSummary" name="sectionSummary" placeholder="summary"/>
                <ErrorMessage name="sectionSummary" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>}/>
            </div>
            
            <ModalFormButtonsWrapper>
                <ActionFormButton attr="save" type="button" onClick={handleSave} className='addButton'>Save</ActionFormButton>
                <ActionFormButton type="button" onClick={onClose} className='addButton'>Cancel</ActionFormButton>
            </ModalFormButtonsWrapper>
        </SectionFormContainer>
    );
};

export default SectionForm;
