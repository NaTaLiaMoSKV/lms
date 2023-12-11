import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from 'redux/auth/authSelectors';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoggedIn = true;
    
    const shouldRedirect = !isLoggedIn;
    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
