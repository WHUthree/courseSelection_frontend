import VueRouter from "vue-router";
import Vue from "vue";
import Loging from "../components/Loging.vue";
import Loging1 from "../components/Loging1.vue";
import Select from "../components/Select.vue";
import Query from "../components/Query.vue";
import User from "../components/User.vue";
import Home from "../components/Home.vue";
import Manage from "../components/Manage.vue";
import Application from "../components/Application.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path:'/',redirect:'/loging'},
        {path:'/loging',component:Loging},
        {path:'/loging1',component:Loging1},
        {path:'/manage',component:Manage},
        {path:'/application',component:Application},
        {
            path:'/home',
            component:Home,
            children:[
                {path:'/',redirect:'/select'},
                {path:'/select',component:Select},
                {path:'/query',component:Query},
                {path:'/user',component:User}
            ]
        },
    ]
});
export default router;