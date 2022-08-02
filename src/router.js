import {createRouter, createWebHistory} from 'vue-router'
import Main from "@/components/Main";
import Login from "@/components/Login";
import Join from "@/components/Join";
import StudyCreate from "@/components/StudyCreate";
import StudyInfo from "@/components/StudyInfo";
import StudyUpdate from "@/components/StudyUpdate";

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
        name: 'StudyInfo',
        component: StudyInfo
    },
    {
        path: '/studies/:id/update',
        name: 'StudyUpdate',
        component: StudyUpdate
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;