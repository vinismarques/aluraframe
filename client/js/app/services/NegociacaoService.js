class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }


    obterNegociacaoSemana() {

        return this._http
            .get("negociacoes/semana")
            .then( negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(error => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana.");
            });

    }

    obterNegociacaoSemanaAnterior() {

        return this._http
            .get("negociacoes/anterior")
            .then( negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(error => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana anterior.");
            });

    }

    obterNegociacaoSemanaRetrasada() {

        return this._http
            .get("negociacoes/retrasada")
            .then( negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(error => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana retrasada.");
            });

    }


}