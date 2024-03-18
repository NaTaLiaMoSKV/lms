import { ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { ActionFormButton, FormContainer, FormErrorMessage, FormInput } from "styles/Form.styled";
import { ModalFormButtonsWrapper } from "../CoursesPage/CoursesPage.styled";


export default function TableForm({ title, onSave, onClose, initialValues }) {
     const { values, setFieldValue } = useFormikContext();

    const tableFormValidationSchema = Yup.object().shape({
        id: Yup.string(),
        name: Yup.string()
            .required('Required')
            .min(5, 'Please use 5 characters or more'),
        email: Yup.string()
            .required('Required')
            .email('Invalid email address'),
    });

    useEffect(() => {
        if (initialValues) {
            setFieldValue('id', initialValues.id || uuidv4()); 
            setFieldValue('name', initialValues.name || '');
            setFieldValue('email', initialValues.email || '');
        } else setFieldValue('id', uuidv4()); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFieldValue]);

    const handleSave = () => {
        const tableFormValues = {
            id: values.id,
            name: values.name,
            email: values.email
        };

        tableFormValidationSchema
            .validate(tableFormValues, { abortEarly: false })
            .then(() => {
                onSave(tableFormValues);
                onClose();
            });
    };

    return (
        <FormContainer>
            <h2 style={{ textAlign: 'center' }}>{title}</h2>
            <div>
                <FormInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                />
                <ErrorMessage name="name" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
            </div>
            <div>
                <FormInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
                <ErrorMessage name="email" render={msg => <FormErrorMessage>{msg}</FormErrorMessage>} />
            </div>
            <ModalFormButtonsWrapper style={{ marginBottom: 0 }}>
                <ActionFormButton attr="save" type="button" onClick={handleSave} className='addButton'>Save</ActionFormButton>
                <ActionFormButton type="button" onClick={onClose} className='addButton'>Cancel</ActionFormButton>
            </ModalFormButtonsWrapper>
        </FormContainer>
        
    )
}