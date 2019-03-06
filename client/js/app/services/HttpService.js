class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", url);

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

                        resolve(JSON.parse(xhr.responseText));

                    } else {

                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();

        });
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
        });

    }
}