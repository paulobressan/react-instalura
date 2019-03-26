
export default class TimelineApi {
    static lista(urlPerfil) {
        // O REDUX THUNK necessita o retorno de um função.
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch({ type: 'LISTAGEM', fotos });
                    //Vamos retornar as fotos para que quem não estiver usando o redux e quiser usar a função lista, vai poder usar normalmente.
                    return fotos;
                });
        }
    }

    static like(fotoId) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    'X-AUTH-TOKEN': localStorage.getItem('auth-token')
                })
            };

            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like`, requestInfo)
                .then(resposta => {
                    if (resposta.ok)
                        return resposta.json()
                    else
                        throw new Error('Não foi possivel realizar o liker na foto')
                })
                .then(liker => {
                    dispatch({ type: 'LIKE', fotoId, liker });
                    //Vamos retornar o liker para que quem não estiver usando o redux e quiser usar a função like, vai poder usar normalmente.
                    return liker;
                });
        }
    }

    static comenta(fotoId, comentario) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: comentario }),
                headers: new Headers({
                    'Content-type': 'application/json',
                    'X-AUTH-TOKEN': localStorage.getItem('auth-token')
                })
            };

            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment`, requestInfo)
                .then(resposta => {
                    if (resposta.ok)
                        return resposta.json();
                    else
                        throw new Error("Não foi possivel comentar");
                })
                .then(novoComentario => {
                    dispatch({ type: 'COMENTARIO', fotoId, novoComentario });
                    //Vamos retornar o novoComentario para que quem não estiver usando o redux e quiser usar a função comenta, vai poder usar normalmente.
                    return novoComentario;
                });
        }
    }
}