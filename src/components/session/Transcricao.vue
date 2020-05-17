<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Transcrição</th>
                    <th scope="col">Quantidade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">Segmento Inteligível</td>
                    <td>
                    <span id="SI">{{SI}}</span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Interrupção do terapeuta</td>
                    <td>
                    <span id='IT'>{{IT}}</span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Hesitação</td>
                    <td>
                    <span id='Hes'>{{HES}}</span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Pausa</td>
                    <td>
                    <span id='Pa'>{{PA}}</span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Bloqueio</td>
                    <td >
                    <span id='Block'>{{BLOCK}}</span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Prolongamento</td>
                    <td >
                    <span id='Pro'>{{PRO}}</span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Intrusão da palavra</td>
                    <td >
                    <span id='IP'>{{IP}}</span>
                    </td>
                </tr>
                <!-- <tr>
                    <td scope="row">Palavras</td>
                    <td >
                    <span id='row_QP'></span>
                    </td>
                </tr>
                <tr>
                    <td scope="row">Sílaba</td>
                    <td >
                    <span id='row_SP'></span>
                    </td> -->
            
            </tbody>
        </table>
    </div>
</template>

<script >
import Transcriptor from '../../services/transcriptorService';
export default {
    name: 'Transcricao',
    components: {
        
    },
    props: {
        amostra: String,
    },
    data: function() {
        return {
            
        };
    },
    computed: {
        SI: function () {
            const a = this?.amostra;
            return Transcriptor.intelligentSegment(a);
        },
        IT: function () {
            const a = this?.amostra;
            return Transcriptor.therapistInterruption(a);
        },
        HES: function () {
            const a = this?.amostra;
            return Transcriptor.hesitation(a);
        },
        PA: function () {
            const a = this?.amostra;
            return Transcriptor.respite(a);
        },
        BLOCK: function () {
            const a = this?.amostra;
            return Transcriptor.block(a);
        },
        PRO: function () {
            const a = this?.amostra;
            return Transcriptor.extension(a);
        },
        IP: function () {
            const a = this?.amostra;
            return Transcriptor.wordIntrusion(a);
        },
    },
    methods: {
    }
}
</script>

<style scoped>

</style>