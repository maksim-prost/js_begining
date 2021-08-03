<template>
	<div>
	<h1> {{namePage}}</h1>
	<h3> Welcome dear {{welcomeText}} </h3>
	<p>
	<button  v-on:click="clickButton('app-register-page')">Регистрация</button>
	<button  v-on:click="clickButton('app-login-page')">Вход</button>
	</p>
	</div>
</template>

<script>
	export default{
		props: {
			namePage: String,
			welcomeText: String
		},
		methods:{
			clickButton:function (page){
				this.$emit('clickButton', page);
			}
		}
	}
</script>