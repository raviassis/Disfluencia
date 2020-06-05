<template>
    <div class="home container-fluid">
        <div class="row">
            <div class="col flex">
                <h1>Disfluência</h1>
                <div>
                    Olá {{user.name}},
                    <router-link to="/login">Sair</router-link>
                </div>
            </div>
        </div>
        
        <div class="row mt-2">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">Sessões</h2>
                        <router-link class="btn btn-primary" to="/session">Nova Sessão</router-link>
                        <ul class="list-group list-group-flush">
                            <router-link 
                                v-for="session in sessions"
                                :key="session._id" 
                                :to="'/session/' + session._id" 
                                class="list-group-item">{{session.name}}</router-link>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authService from '../../services/authService';
export default {
    name: 'Home',
    data: function() {
        return {
            sessions: [],
            user: authService.getUserLogged(),
        };
    },
    beforeMount: async function () {
        this.sessions = (await this.$http.get(`/sessions?_idUser=${this.user._id}`)).data;
    },
    methods: {},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home .flex {
    display: flex;
    justify-content: space-between;
}
</style>