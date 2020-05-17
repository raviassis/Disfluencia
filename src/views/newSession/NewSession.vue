<template>
    <Session v-model="session" v-on:save="save"/>
</template>
<script>
import Session from '../../components/session/Session';
import Transcriptor from '../../services/transcriptorService';
export default {
    name: 'NewSession',
    components: {
        Session
    },
    data: function() {
        return {
            session: {
                name: '',
                speechSample: '',
                annotation: ''
            },
        };
    },
    methods: {
        save() {
            const session = this.createRequestBodyNewSession();
            this.$http.post('/sessions', session)
                    .then(() => {
                        alert('Sessão salva com sucesso!');
                        this.$router.push('/');
                    })
                    .catch((err) => {
                        if(err.response.status == 422) {
                            this.tratarErroValidacao(err.response.data);
                        }
                        else {                            
                            alert('Ocorreu um erro inesperado ao salvar a sessão!');
                        }
                    });
        },
        createRequestBodyNewSession(){
            return {
                name: this.session.name,
                speechSample: this.session.speechSample,
                annotation: this.session.annotation,
                transcription: Transcriptor.transcript(this.session.speechSample)
            };
        },
        tratarErroValidacao(err){
            const msg = err.errors?.map(e => e.message).reduce((s1, s2) => s1 + '\n' + s2, '');
            alert(msg);
        },

    },
}
</script>