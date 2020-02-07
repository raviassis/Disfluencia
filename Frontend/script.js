

function contagem(){
    
    let amostra = document.getElementById("input_amosta").value
    let amostraModificada = contagemInterrupcaoTerapeuta(amostra)
    contagemSegmentoInteligivel(amostra)
    contagemHesitacao(amostra)
    amostraModificada = contagemPausa(amostraModificada)
    contagemIntrusaoPalavra(amostraModificada)
    contagemBloqueio(amostraModificada)
    contagemProlongamento(amostraModificada)

}

// /Olá /meu nome é jjjjJosé Mar/celo Ferreira de__ /Castro #é tenho ~~~~~~~ deze/ nove anos estudo ad/ minis/ tra/ ção na_ UF_MG #é_ eu tinha_ es/_____colhido o curso porquê eu gosto_ muito de_  ~~~~~~~né então eu já esss/ tou no meu ter/ceiro  período_ já  ainda falta_ dois_/ anos_/ e_ meio para_ eu me_ /formar eu gosto muito de_ medi/ tar acho que isso me ajjjjuda em mui/ tas coisas áreas né da da da minha vida_ tanto na minha_ /fala e também_ no auto/____________ conhecimento né e_ #é no último ano_ eu comecei a ffffazer /Yoga né ~~~~~~~ muito mesmo uma_ viagem que eu tinha_ /feito que eu tinha________ gos/tado muito ffffoi ~~~~~~~ né eu ter ido /no/ em mar/ço desse ano né foi uma_ experi/ ência  muito boa porquê  eu tive_ #é con/____tato com_ pes_/soas diferentes né de diver/sãs áreas né que me a/greg/ou ~~~~~~~ muito mesmo

function contagemSegmentoInteligivel(amostra){
    let segmentoInteligivel = (amostra.split("~~~~~~~").length-1)
    document.getElementById("SI").textContent = segmentoInteligivel; 
}

function contagemInterrupcaoTerapeuta(amostra){
    amostra = amostra.replace("//","!")
    let interrupcaoTerapeuta = (amostra.split("!").length-1)
    document.getElementById("IT").textContent = interrupcaoTerapeuta
    return amostra
}

function contagemHesitacao(amostra){
    let hesitacao = (amostra.split("#").length-1)
    document.getElementById("Hes").textContent = hesitacao
}

function contagemPausa(amostra){
    amostra = amostra.replace("________","@")
    let pausa = (amostra.split("@").length-1)
    document.getElementById("Pa").textContent = pausa
    return amostra;
}

function contagemIntrusaoPalavra(amostra){
    amostra = amostra.replace("/ /","&")
    let pausa = (amostra.split("&").length-1)
    document.getElementById("IP").textContent = pausa
    return amostra
}

function contagemBloqueio(amostra){
    let bloqueio = (amostra.split("/").length-1)
    document.getElementById("Block").textContent = bloqueio
}

function contagemProlongamento(amostra){
    let prolongamento = (amostra.split("_").length-1)
    document.getElementById("Pro").textContent = prolongamento
}