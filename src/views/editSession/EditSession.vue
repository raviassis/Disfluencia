<template>
    <Session v-model="session" v-on:save="editSession"/>
</template>
<script>
import Session from '../../components/session/Session';
import Transcriptor from '../../services/transcriptorService';

export default {
    name: 'EditSession',
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
    beforeMount: async function() {
        const id = this.$route.params.id;
        if (id) {
            this.session = (await this.$http.get(`/sessions/${id}`)).data;
        }
    },
    methods: {
        editSession() {
            const session = this.createRequestBodyEditSession();
            console.log(session);
        },
        createRequestBodyEditSession(){
            return {
                _id: this.session._id,
                name: this.session.name,
                speechSample: this.session.speechSample,
                annotation: this.session.annotation,
                transcription: Transcriptor.transcript(this.session.speechSample)
            };
        },
    },
}
</script>