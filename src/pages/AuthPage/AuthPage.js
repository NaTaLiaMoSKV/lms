import LoginForm from "components/AuthForm/AuthForm";
import css from './AuthPage.module.css'

export default function AuthPage() {
    return (
        <div className={css.authPageContainer}>
            <LoginForm />
        </div>
    )
}