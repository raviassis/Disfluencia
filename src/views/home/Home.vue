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
                        <div class="flex">
                            <h2 class="card-title">Sessões</h2>
                            <div><router-link class="btn btn-primary" to="/session">Nova Sessão</router-link></div>
                        </div>
                        <div class="form-group">
                            <input v-model="search" v-on:input="searchSession" type="text" class="form-control" placeholder="Pesquisar sessão">
                        </div>
                        <ul class="list-group list-group-flush">
                            <router-link 
                                v-for="session in sessionsFiltered"
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
            sessionsFiltered: [],
            user: authService.getUserLogged(),
            search: '',
        };
    },
    beforeMount: async function () {
        this.sessionsFiltered = this.sessions = (await this.$http.get(`/sessions?_idUser=${this.user._id}`)).data;
    },
    methods: {
        normalize(str) {
            return str.normalize("NFKD").replace(/[^\w]/g, '');
        },
        searchSession: function () {
            if (!this.search) {
                this.sessionsFiltered = this.sessions;
                return;
            }
            const regex = new RegExp(this.normalize(this.search), "i");
            this.sessionsFiltered = this.sessions
                                            .filter(
                                                session => this.normalize(session.name).search(regex) >= 0 
                                            );
        }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home .flex {
    display: flex;
    justify-content: space-between;
}
</style>