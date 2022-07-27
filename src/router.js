import {createRouter, createWebHistory} from 'vue-router'
import Main from "@/components/Main";
import Login from "@/components/Login";
import Join from "@/components/Join";
import StudyCreate from "@/components/StudyCreate";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;