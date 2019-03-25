import PubSub from 'pubsub-js';

export default class TimelineApi {
    constructor(fotos) {
        this.fotos = fotos;
    }

    subscribe(callback) {
        PubSub.subscribe('timeline', (topico, fotos) => {
            callback(fotos.fotos);
        });
    }

    static lista(urlPerfil) {
        // O REDUX THUNK necessita o retorno de um função.
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch({ type: 'LISTAGEM', fotos })
                });
        }
    }

    like(fotoId) {
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
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId)

                const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

                fotoAchada.likeada = !fotoAchada.likeada;

                if (!possivelLiker) {
                    //Alterar o likers de uma das fotos da timeline
                    fotoAchada.likers.push(liker);
                } else {
                    const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoAchada.likers = novosLikers;
                }
                PubSub.publish('timeline', { fotos: this.fotos });
            });
    }

    comenta(fotoId, comentario) {
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
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId)
                fotoAchada.comentarios.push(novoComentario)
                // Alterar o estado das fotos porque uma das fotos esta alterada
                PubSub.publish('timeline', { fotos: this.fotos });
            });
    }
}