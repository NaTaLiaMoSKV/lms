import css from './Header.module.css'
import logoImage from '../../images/logo512.png'
import userImage from '../../images/user1.jpg'

export default function Header() {
    const adminName = 'Natalia';

    return (
        <header>
            <div className={css.headerContainer}>
                <img className={css.logoImage} src={logoImage} alt='logo' />
                <h1 className={css.logoText} >LMS</h1>
            </div>
            <div className={css.headerContainer}>
                <h3 className={css.headerUserText}>Hello, {adminName}</h3>
                <div className={css.userImageWrapper}>
                    <img className={css.userImage} src={userImage} alt='user' />
                </div>
            </div>          
        </header>
    )
}