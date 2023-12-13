import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import css from './AuthForm.module.css'

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 5) {
        errors.name = 'Please use 5 characters or more';
    }
                    
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/.test(values.password)) {
        errors.password = 'Please use between 5 and 15 characters, including only letters and numbers';
    }
    
    return errors;
}

export default function AuthForm() {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik(
        {
            initialValues: {
                name: '',
                email: '',
                password: '',
            },
            validate,
            onSubmit: values => {
                console.log(`name: ${values.name}\nemail: ${values.email}\npassword: ${values.password}`)
            },
        });
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }        
    
    return (
        <div className={css.formContainer}>
            <form validate={formik.validate} onSubmit={formik.handleSubmit} className={css.form}>
                <div className={css.formInputContainer}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <div className={css.errorMessage}>{formik.errors.name}</div> : null}
                </div>

                <div className={css.formInputContainer}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div className={css.errorMessage}>{formik.errors.email}</div> : null}
                </div>

                <div className={css.formInputContainer}>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        maxLength='15'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <span className={css.inputIcon} onClick={handleTogglePassword}>
                            {showPassword ? (
                                <AiOutlineEye style={{ width: '25px', height: '25px', color: '#28282868' }} />
                                ) : (
                                <AiOutlineEyeInvisible
                                    style={{ width: '25px', height: '25px', color: '#28282868' }}
                                />
                            )}
                    </span>
                    {formik.errors.password ? <div className={css.errorMessage}>{formik.errors.password}</div> : null}
                </div>
                
                <button className={css.submitButton} type="submit">Submit</button>
                
                <NavLink to='/home/student'>Student</NavLink>
                <NavLink to='/home/teacher'>Teacher</NavLink>
                <NavLink to='/home/admin/dashboard'>Admin</NavLink>
            </form>
        </div>
    )
}