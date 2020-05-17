<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h1>Disfluência</h1>
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
export default {
    name: 'Home',
    data: function() {
        return {
            sessions: []
        };
    },
    beforeMount: async function () {
        this.sessions = (await this.$http.get('/sessions/')).data;
    },
    methods: {},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>