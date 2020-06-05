<template>
  <div class="container-fluid container-login">
    <div class="container-form">
      <h1 class="form-header">Digite seu email e uma senha para fazer login!</h1>

      <div class="form">
        <form autocomplete="off">
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

          <div class="form-footer">
            <button type="button" v-on:click="login()" class="btn btn-primary btn-form">Login</button>
            <div class="not-registered">
              <p class="not-registered-text">Não possui cadastro?</p>
              <router-link class="btn btn-primary" to="/register">Cadastrar</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Login",
  data: function() {
    return {
      form: {
        errors: [],
        email: null,
        password: null
      }
    };
  },

  beforeMount: async function() {},

  methods: {
    login: function() {
      debugger;
      if (this.isFormValid()) {
        const user = this.createRequestBodyNewUser();
        this.$http
          .post("/users/login", user)
          .then(userFound => {
            sessionStorage.setItem("user", JSON.stringify(userFound.data));
            alert("Bem vindo ao sistema");
            this.clearFormFields();
            this.$router.push("/");
          })
          .catch((err) => {
            debugger;
            if (err.response && err.response.status == 422) {
              this.tratarErroValidacao(err.response.data);
            } else {
              alert("Ocorreu um erro inesperado ao acessar o sistema");
            }
            this.clearFormFields();
          });
      }
    },

    createRequestBodyNewUser() {
      return {
        email: this.form.email,
        password: this.form.password
      };
    },

    isFormValid: function() {
      this.form.errors = [];

      if (!this.form.password) {
        this.form.errors.push("A senha é obrigatória.");
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
      this.form.email = null;
      this.form.password = null;
    }
  }
};
</script>

<style scoped>
.container-login {
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
.form-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.not-registered {
  display: flex;
}
.not-registered-text {
  padding-top: 7px;
  padding-right: 14px;
  margin-bottom: 0;
}
</style>