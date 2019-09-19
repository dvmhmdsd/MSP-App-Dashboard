import Home from './components/Home';

import Courses from './components/courses/Courses';
import AddCourse from './components/courses/AddCourse';

import Events from './components/events/Events';
import AddEvent from './components/events/AddEvent';

import Projects from './components/projects/Projects';
import AddProject from './components/projects/AddProject';

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
        path: '/projects',
        component: Projects
    },
    {
        path: '/projects/new',
        component: AddProject
    },
]