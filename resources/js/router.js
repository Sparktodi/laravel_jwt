import Vue from 'vue';
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const route = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/fruits', component: () => import('./components/Fruits/Index.vue'),
            name: 'fruits.index'
        },
        {
            path: '/users/login', component: () => import('./components/Users/Login.vue'),
            name: 'users.login'
        },
        {
            path: '/users/registration', component: () => import('./components/Users/Registration.vue'),
            name: 'users.reg'
        },

        {
            path: '/users/person', component: () => import('./components/Users/Personal.vue'),
            name: 'users.personal'
        },

        {
            path: '*', component: () => import('./components/Users/Personal.vue'),
            name: '404'
        },

    ]
})

route.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token')


    if (!accessToken) {
        if (to.name === 'users.login' || to.name === 'users.reg') {
            return next()
        }
        else {
            return next({ name: 'users.login' })
        }
    }

    if (to.name === 'users.login' || to.name === 'users.reg' && accessToken) {
        return next({ name: 'users.personal' })
    }

    next();
})

export default route

