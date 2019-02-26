class View {

    constructor(elemento) {

        this._elemento = elemento;
    }

    template() {

        throw new Error("É necessário implementar o método template");
    }

    update(model) {

        this._elemento.innerHTML = this.template(model);
    }

}