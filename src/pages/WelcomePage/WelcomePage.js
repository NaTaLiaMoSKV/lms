import { NavLink } from "react-router-dom";


export default function WelcomePage() {
    return (
        <>
            <h1>Welcome to this LMS</h1>
            <h4>About system .....</h4>
            <ul>
                <li>OmniLearn</li>
                <li>MultiSkillMentor</li>
                <li>UniversalMindsEd</li>
                <li>CourseCompendium</li>
                <li>MasterMindLearn</li>
                <li>WisdomWave</li>
            </ul>

            <NavLink to='/auth'>Sign up</NavLink>
        </>
    )
}