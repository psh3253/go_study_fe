import {createRouter, createWebHistory} from 'vue-router'
import Main from "@/components/Main";
import Login from "@/components/Login";
import Join from "@/components/Join";
import StudyCreate from "@/components/StudyCreate";
import StudyUpdate from "@/components/StudyUpdate";
import StudyRedirect from "@/components/StudyRedirect";
import Profile from "@/components/Profile";
import ProfileUpdate from "@/components/ProfileUpdate";
import PasswordChange from "@/components/PasswordChange";
import StudyDetails from "@/components/StudyDetails";
import PostCreate from "@/components/PostCreate";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/join',
        name: 'Join',
        component: Join
    },
    {
        path: '/studies/create',
        name: 'StudyCreate',
        component: StudyCreate
    },
    {
        path: '/studies/:id',
        name: 'StudyDetails',
        component: StudyDetails
    },
    {
        path: '/studies/:id/update',
        name: 'StudyUpdate',
        component: StudyUpdate
    },
    {
        path: '/:accessUrl',
        name: 'StudyRedirect',
        component: StudyRedirect
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/profile/update',
        name: 'ProfileUpdate',
        component: ProfileUpdate
    },
    {
        path: '/profile/change-password',
        name: 'PasswordChange',
        component: PasswordChange
    },
    {
        path: '/studies/:id/posts/create',
        name: 'PostCreate',
        component: PostCreate
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;