<template>
  <div class="container-fluid container-register">
    <div class="container-form">
      <h1 class="form-header">Digite seu email e uma senha para realizar o seu cadastro!</h1>

      <div class="form">
        <form @submit="register()" autocomplete="off">
             <p>
            <label class="form-label" for="form.name">Nome</label>
            <input class="form-control" id="form.name" v-model="form.name" type="text" />
          </p>
          <p>
            <label class="form-label" for="form.email">Email</label>
            <input class="form-control" id="form.email" v-model="form.email" type="email" />
          </p>
          <p>
            <label class="form-label" for="form.password">Senha</label>
            <input class="form-control" id="form.password" v-model="form.password" type="password" />
          </p>
          <div v-if="form.errors.length">
            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
              <li v-for="error in form.errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </div>

          <button class="btn btn-primary btn-form">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Register",
  data: function() {
    return {
      form: {
        errors: [],
        name: null,
        email: null,
        password: null
      }
    };
  },

  beforeMount: async function() {},

  methods: {
    register: function() {
      if (this.isFormValid()) {
        const user = this.createRequestBodyNewUser();
        console.log(user)
        this.$http
          .post("/user", user)
          .then(() => {
            
            alert("Cadastro realizado com sucesso");
            this.$router.push("/");
          })
          .catch(() => {
            alert("Ocorreu um erro inesperado ao salvar a sessão!");
          });

        this.clearFormFields();
      }
    },

    createRequestBodyNewUser() {
      return {
        nome: this.form.name,
        email: this.form.email,
        password: this.form.password
      };
    },

    isFormValid: function() {
      this.form.errors = [];

      if (!this.form.password) {
        this.form.errors.push("A senha é obrigatória.");
      }

      if(!this.form.name){
         this.form.errors.push("O nome é obrigatório.");
      }

      if (!this.form.email) {
        this.form.errors.push("O e-mail é obrigatório.");
      } else if (!this.validateEmail(this.form.email)) {
        this.form.errors.push("Utilize um e-mail válido.");
      }

      if (this.form.errors.length == 0) {
        return true;
      } else {
        return false;
      }
    },

    validateEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    clearFormFields: function() {
      this.form.name = null;
      this.form.email = null;
      this.form.password = null;
    }
  }
};
</script>

<style scoped>
.container-register {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8e6ff;
}
.container-form {
  width: 500px;
  height: 500px;
}
.form-header {
  font-size: 2rem;
}
.form {
  margin-top: 35px;
}
.form-label {
  font-size: 1.5rem;
}
.btn-form {
  margin-top: 20px;
}
</style>