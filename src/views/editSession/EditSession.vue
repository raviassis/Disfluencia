<template>
  <Session v-model="session" v-on:save="editSession" v-on:apagaSessao="apagaSessao" />
</template>
<script>
import Session from '../../components/session/Session';
import Transcriptor from '../../services/transcriptorService';
import authService from '../../services/authService';
export default {
  name: 'EditSession',
  components: {
    Session,
  },
  data: function() {
    return {
      session: {
        name: '',
        speechSample: '',
        annotation: '',
      },
      user: authService.getUserLogged(),
    };
  },
  beforeMount: async function() {
    const id = this.$route.params.id;
    if (id) {
      this.session = (await this.$http.get(`/sessions/${id}`)).data;
    }
  },
  methods: {
    editSession() {
      const session = this.createRequestBodyEditSession();
      this.$http
        .put('/sessions', session)
        .then(() => {
          alert('Sessão salva com sucesso!');
        })
        .catch((err) => {
          if (err.response.status == 422) {
            this.tratarErroValidacao(err.response.data);
          } else {
            alert('Ocorreu um erro inesperado ao salvar a sessão!');
          }
        });
    },
    apagaSessao() {
      const id = this.$route.params.id;
      this.$http
        .delete(`/sessions/${id}`)
        .then(() => {
          alert('Sessão excluída com sucesso!');
          this.$router.push('/');
        })
        .catch((err) => {
          if (err.response.status == 422) {
            this.tratarErroValidacao(err.response.data);
          } else {
            alert('Ocorreu um erro inesperado ao excluir a sessão!');
          }
        });
    },
    createRequestBodyEditSession() {
      return {
        _idUser: this.user._id,
        _id: this.session._id,
        name: this.session.name,
        speechSample: this.session.speechSample,
        annotation: this.session.annotation,
        transcription: Transcriptor.transcript(this.session.speechSample),
      };
    },

    tratarErroValidacao(err) {
      const msg = err.errors?.map((e) => e.message).reduce((s1, s2) => s1 + '\n' + s2, '');
      alert(msg);
    },
  },
};
</script>
