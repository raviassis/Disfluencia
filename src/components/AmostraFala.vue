<template>
    <div class="amostraFala">
        <div class="form-group">
            <textarea 
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                class="form-control textArea"
                placeholder="Registre aqui a amostra da fala" >
            </textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AmostraFala',
  props: {
    value: String,
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.amostraFala, .amostraFala > div{
    height: 100%;
}

.textArea{
    width: 100%;
    height: 100%;
}
</style>