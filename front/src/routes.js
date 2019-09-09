import Home from './components/Home';

import Courses from './components/courses/Courses';
import AddCourse from './components/courses/AddCourse';

import Events from './components/events/Events';
import AddEvent from './components/events/AddEvent';

import Signin from './components/users/signin';
import Signup from './components/users/signup';


export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/courses',
        component: Courses
    },
    {
        path: '/courses/new',
        component: AddCourse
    },
    {
        path: '/events',
        component: Events
    },
    {
        path: '/events/new',
        component: AddEvent
    },
    {
        path: '/signin',
        component: Signin
    },
    {
        path: '/signup',
        component: Signup
    }
]