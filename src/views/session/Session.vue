<template>
    <div class="sessaoDisfuncao container-fluid">
        <div class="row mt-3">
            <div class="col-md-10 form-group">
                <input v-model="nameSession" type="text" class="form-control" placeholder="Nome da sessão">
            </div>
            <div class="col-md-2 form-group">
                <button 
                    class="btn btn-block"
                    v-bind:class="{'btn-success': enabled(), 'btn-light': !enabled()}"
                    v-on:click="save()" 
                    :disabled="!enabled()">Salvar</button>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-md-7">
                <AmostraFala v-model="amostra" />
            </div>

            <div class="col-md-5">
                <Transcricao v-bind:amostra="amostra"/>
                
            </div>
        </div>
        <div class="row">
            <div class="col">
                <textarea 
                    class="form-control mb-5"
                    rows="5"
                    placeholder="Escreva aqui suas anotações"
                    v-model="annotation">
                </textarea>
            </div>
            
        </div>
    </div>
</template>

<script>
import AmostraFala from './AmostraFala.vue';
import Transcricao from './Transcricao.vue';
import Transcriptor from '../../services/transcriptorService';
export default {
    name: 'SessaoDisfuncao',
    components: {
        AmostraFala,
        Transcricao,
    },
    props: {

    },
    data: function() {
        return {
            nameSession: '',
            amostra: '',
            annotation: '',
        };
    },
    methods: {
        save() {
            console.log(this.createRequestBody());
            const session = this.createRequestBody();
            this.$http.post('/session', session)
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
        createRequestBody(){
            return {
                name: this.nameSession,
                speechSample: this.amostra,
                annotation: this.annotation,
                transcription: Transcriptor.transcript(this.amostra)
            };
        },
        tratarErroValidacao(err){
            const msg = err.errors?.map(e => e.message).reduce((s1, s2) => s1 + '\n' + s2, '');
            alert(msg);
        },
        enabled(){
            return this.nameSession && this.nameSession.trim().length > 0;
        }
    }
}

// /Olá /meu nome é jjjjJosé Mar/celo Ferreira de__ /Castro #é tenho ~~~~~~~ deze/ nove anos estudo ad/ minis/ tra/ ção na_ UF_MG #é_ eu tinha_ es/_____colhido o curso porquê eu gosto_ muito de_  ~~~~~~~né então eu já esss/ tou no meu ter/ceiro  período_ já  ainda falta_ dois_/ anos_/ e_ meio para_ eu me_ /formar eu gosto muito de_ medi/ tar acho que isso me ajjjjuda em mui/ tas coisas áreas né da da da minha vida_ tanto na minha_ /fala e também_ no auto/____________ conhecimento né e_ #é no último ano_ eu comecei a ffffazer /Yoga né ~~~~~~~ muito mesmo uma_ viagem que eu tinha_ /feito que eu tinha________ gos/tado muito ffffoi ~~~~~~~ né eu ter ido /no/ em mar/ço desse ano né foi uma_ experi/ ência  muito boa porquê  eu tive_ #é con/____tato com_ pes_/soas diferentes né de diver/sãs áreas né que me a/greg/ou ~~~~~~~ muito mesmo
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>