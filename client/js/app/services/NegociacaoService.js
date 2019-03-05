class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesSemana(),
                this.obterNegociacoesSemanaAnterior(),
                this.obterNegociacoesSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }
    
    obterNegociacoesSemana() {

        return this._http
            .get("negociacoes/semana")
            .then( negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana.");
            });

    }

    obterNegociacoesSemanaAnterior() {

        return this._http
            .get("negociacoes/anterior")
            .then( negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana anterior.");
            });

    }

    obterNegociacoesSemanaRetrasada() {

        return this._http
            .get("negociacoes/retrasada")
            .then( negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana retrasada.");
            });

    }


}