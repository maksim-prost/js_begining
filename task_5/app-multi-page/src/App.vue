<template>

<div >
    <div class='header'>
        <h2>Заголовок сайта</h2>
    </div>
    <div class='nav'>
    <a  v-for="tab of tabs" 
        v-bind:class='disabled(tab.link)'
        href="#" v-on:click.prevent="currentForm = tab.link">
        {{tab.name}}
    </a>  
    </div>
    <div class="content">
        <div class='column'>
            <div class='translate-video'>
                <input v-model="linkVideo" placeholder="ссылка на видео в Youtube">
                <iframe  v-bind:src="linkVideo" width="100%"  frameborder="0" allowfullscreen>
                </iframe>

            </div>
            <div class='chat'>
                <app-show-users v-bind:http='request'> </app-show-users>
            </div>
        </div>
        <div class='column'>
            <component v-bind:is="currentForm "  
            v-bind:http='request'
            v-bind:namePage = 'namePage'
            v-bind:welcomeText = 'String(welcomeText)'
            v-on:succesLogin='succesLogin'
            v-on:clickButton='clickButton'>
            </component>
        </div>
    </div>
    <div class='footer'></div>
</div>

</template>

<style>
    html body{
        margin: 0;
        padding:0;
    }
    .header{
        background-color: #f0a;
        padding: 5px 150px  5px 0px ;

    }
    .header h2{
        color: #eee;
        text-align: right;
    }
    .nav{
        display: flex;
        /*text-align: left;*/
        padding: 15px 40px ;
    }
    .nav a{
        flex:1;
        color: #a0f;
    }
    .content{
        display: flex;

    }
    .column{
        flex:1;
    }
    .column:nth-of-type(2){
        flex:2;
    }
    .footer{
        height: 10px;
        /*margin: 500px 0 0;*/
        background-color: #a0f;
        /*bottom: 0px;*/
    }
    a.disabled{
        pointer-events: none; /* делаем ссылку некликабельной */
        cursor: default;  /* устанавливаем курсор в виде стрелки */
        color: #999; /* цвет текста для нективной ссылки */
    }
</style>

<script>

import mainPage from "./main-page.vue";
import login from "./login-page.vue";
import showUsers from "./show-user-page.vue";
import registerPage from "./register-page.vue";

export default {
    data () {
        return {
            tabs:[
                {link:'app-main-page',name:' Главная страница '},
                {link:'app-register-page',name:' Регистрация '},
                {link:'app-login-page',name:" Вход "},
                {link:'app-show-users',name:" Показать пользователей "}
            ],
            currentForm:'app-main-page',
            namePage:'Some name',
            welcomeText: 'stranger',
            linkVideo:'https://www.youtube.com/embed/LGyihQvDEw4',
        }
    },
    methods:{
            clickButton:function (page){
                this.currentForm = page;
            },
            succesLogin:function(user){
                this.welcomeText = user;
                this.currentForm='app-main-page'
            },
            request:function (self,methodRequest,next) {
                let url = 'http://127.0.0.1:5000/'; 
                url = self.$el.action
                var data = new URLSearchParams(new FormData(self.$el))
                data.append('method',methodRequest);
                console.log('method',methodRequest,'data',data);
                fetch(url, {
                headers: {'Content-Type': "application/x-www-form-urlencoded"},
                method: 'POST',
                body: data,
                }).then(response => response.json())
                .then(json=>(self.response=json))
            },
            disabled: function (link) {
                if(this.currentForm == link){
                    return 'disabled'
                }
                return 'active'
            }
    },
    components:{
        appMainPage:mainPage,
        appRegisterPage:registerPage,
        appLoginPage:login,
        appShowUsers:showUsers,
    },

}
</script>

