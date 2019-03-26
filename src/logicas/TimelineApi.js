// Para centralizar os nomes das ACTIONS('LISTAGEM', ...), vamos criar funções que centraliza os dispatch das ações
import { listagem, comentario, like, notificar } from '../actions/actionCreator';


export default class TimelineApi {
    static lista(urlPerfil) {
        // O REDUX THUNK necessita o retorno de um função.
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagem(fotos));
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
                    dispatch(like(fotoId, liker));
                    //Vamos retornar o liker para que quem não estiver usando o redux e quiser usar a função like, vai poder usar normalmente.
                    return liker;
                });
        }
    }

    static comenta(fotoId, textoComentario) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: textoComentario }),
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
                    dispatch(comentario(fotoId, novoComentario));
                    //Vamos retornar o novoComentario para que quem não estiver usando o redux e quiser usar a função comenta, vai poder usar normalmente.
                    return novoComentario;
                });
        }
    }

    static pesquisa(login) {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${login}`)
                .then(resposta => resposta.json())
                .then(fotos => {
                    if(fotos.length === 0){
                        dispatch(notificar('Usuário não encontrado'));
                    }else{
                        dispatch(notificar('Usuário encontrado'));
                    }
                    dispatch(listagem(fotos));
                    return fotos;
                });
        }
    }
}