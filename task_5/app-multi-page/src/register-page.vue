<template>
<form
  id="app"
  @submit="checkForm"
  action='http://127.0.0.1:5000/'
  method="post"
>
  <p>Registration</p>
  <p  v-if="errorEmpty">
    <b>Пожалуйста исправьте указанные ошибки:</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="login">Логин</label>
    <input
      id="login"
      v-model="login"
      type="text"
      name="login"
    >
  </p>
  <p>
    <label for="password">Пароль</label>
    <input
      id="password"
      v-model="password"
      type="password"
      name="password">
  </p>
  <p>
    <label for="eMail">Электронная почта</label>
    <input
      id="eMail"
      type="text"
      name="eMail">
  </p>
  <p>
    <label for="someParametr">Дополнительное поле</label>
    <input
      id="someParametr"
      type="text"
      name="someParametr">
  </p>
  <p>
    <input
      type="submit"
      value="Отправить">
  </p>

</form>
</template>
<script >
	
export default{
	props:{
		'http': Function
	},
	data :function (){
	    return {
	    	errors: [],
	        login:11,
	        password: 22,
	        response:null,
   		};
  	},
 	methods: {
	    checkForm: function (e) {
			e.preventDefault();
			this.errors = [];
			if (!this.login) {
				this.errors.push('Требуется логин.');
			}
			if (!this.password) {
				this.errors.push('Требуется пароль.');
			}
			if (this.password && this.login){
				this.http(this,'register-page');
			}

		}
	}, 
	computed:{
		errorEmpty:function () {
			
			if (this.response){
			// console.log('checkF',this.response)
				if (this.response.response){
					// console.log('response',this.response.response);
					this.$emit('succesLogin', this.login);
				}else{
					this.errors = this.response.errors;
					this.response = null;
				}
			}
			return this.errors.length;
		},
	},
}
</script>