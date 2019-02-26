class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            "adiciona", "esvazia");

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            "texto");

    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._limpaFormulario();
    }

    importa() {

        let xhr = new XMLHttpRequest();

        xhr.open("GET", "negociacoes/semana");

        xhr.onreadystatechange = () => {

            /*
            Value	State	            Description
            0	    UNSENT              Client has been created. open() not called yet.
            1	    OPENED	            open() has been called.
            2	    HEADERS_RECEIVED    send() has been called, and headers and status are available.
            3	    LOADING	            Downloading; responseText holds partial data.
            4	    DONE	            The operation is complete.
            */

            if (xhr.readyState == 4) {

                if (xhr.status == 200) {

                    JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        .forEach(negociacao => {
                            this._listaNegociacoes.adiciona(negociacao)
                        });
                    console.log("Negociações importadas com sucesso.");

                }else {

                    console.log(xhr.responseText);
                    console.log("Não foi possível obter as negociações do servidor.");
                }
            }
        };
        
        xhr.send();
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    _limpaFormulario() {

        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}