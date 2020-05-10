export default {
    _valid(speechSample) {
        if(!speechSample || typeof speechSample !== "string") return;
    },
    transcript(speechSample) {
        return {
            intelligentSegment: this.intelligentSegment(speechSample),
            therapistInterruption: this.therapistInterruption(speechSample),
            hesitation: this.hesitation(speechSample),
            respite: this.respite(speechSample),
            block: this.block(speechSample),
            extension: this.extension(speechSample),
            wordIntrusion: this.wordIntrusion(speechSample)
        };
    },
    intelligentSegment(speechSample) {
        this._valid(speechSample);
        return (speechSample.split("~~~~~~~").length-1);
    },
    therapistInterruption(speechSample) {
        this._valid(speechSample);
        return (speechSample.replace("//","!").split("!").length-1);
    },
    hesitation(speechSample) {
        this._valid(speechSample);
        return (speechSample.split("#").length-1);
    },
    respite(speechSample) {
        this._valid(speechSample);
        return (speechSample.replace("________","@").split("@").length-1);
    },
    block(speechSample) {
        this._valid(speechSample);
        return (speechSample.split("/").length-1);
    },
    extension(speechSample) {
        this._valid(speechSample);
        return (speechSample.split("_").length-1);
    },
    wordIntrusion(speechSample) {
        this._valid(speechSample);
        return (speechSample.replace("/ /","&").split("&").length-1);
    },
}