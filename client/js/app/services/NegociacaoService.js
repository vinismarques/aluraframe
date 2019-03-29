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

    cadastra(negociacao) {
        return ConnectionFactory
           .getConnection()
           .then(conexao => new NegociacaoDao(conexao))
           .then(dao => dao.adiciona(negociacao))
           .then(() => 'Negociação cadastrada com sucesso')
           .catch(erro => {
               console.log(erro);
               throw new Error("Não foi possível adicionar a negociação")
           });
    }

   lista() {
    return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações')
            })
    }

    apaga() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            });
    }

}