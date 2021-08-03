<template>
<form
  id="app"
  @submit="checkForm"
  action='http://127.0.0.1:5000/'
  method="post"
>
<p v-on="console(response)">Show user</p>
<p v-if='usersEmpty'> В базе данных нет пользователей</p>
<p v-else>
    <table border="1" width="100%" cellpadding="5">
       <tr>
        <th>№</th>
       	<th>Дата</th>
        <th>Пользователь</th>
        <th>Электронная почта</th>
        <th>Дополнительное поле</th>
       </tr>
       <tr v-for='user of users'>
        <td v-for='parametr in user'>{{parametr}}</td>
      </tr>
     </table>
</p>
  </form>
</template>

<script >
	export default{
	props:{
		'http': Function,
	},
	data :function (){
	    return {
	    	users:[],
	    	errors: [],
	        login: null,
	        password: null,
	        response:null,
   		};
  	},
 	methods: {
 		console:function(msg){
 			console.log(msg);

 		},
	    checkForm: function (e) {
		    e.preventDefault();
		    this.http(this,'show-users');
		    this.users = this.response.users;
		},
		
	},
	mounted(){
		this.http(this,'show-users');
		console.log(this.users);
	},
	computed:{
		usersEmpty:function () {
			if (this.response){
				this.users = this.response.users;
			}
			return this.users.length==0;
		},
 
	}

}
</script>