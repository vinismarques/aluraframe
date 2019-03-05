class NegociacaoService {

    obterNegociacaoSemana() {

        return new Promise((resolve, reject) => {

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

                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {

                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana.");
                    }
                }
            };

            xhr.send();

        });

    }

    obterNegociacaoSemanaAnterior() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", "negociacoes/anterior");

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

                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {

                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana anterior.");
                    }
                }
            };

            xhr.send();

        });

    }

    obterNegociacaoSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", "negociacoes/retrasada");

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

                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {

                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana retrasada.");
                    }
                }
            };

            xhr.send();

        });

    }


}