// O ARQUIVO REPRESENTA TODAS FUNÇÕES REDUTORAS USADA NA STORE DO REDUX DE TIMELINE

import { List } from 'immutable';

//Função que tem a responsabilidade de retornar uma lista immutable
function trocaFoto(lista, fotoId, callback) {
    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId)

    const novasPropriedades = callback(fotoEstadoAntigo)
    // Realizar um merge de fotoEstadoAntigo e trocas a props comentarios para novos comentarios.
    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades)

    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);
    //Na ação LISTAGEM carregamos uma lista immutable, por isso esta disponivel a função set no estado anterior
    //A função set espera um indece e um novo objeto e retornar uma nova lista com o indece trocado para o novo objeto
    return lista.set(indiceDaLista, fotoEstadoNovo)
}

const INITIAL_STATE = {
    fotos: new List()
}

//O redux tem a ideia de dados imutaveis. Toda store recebe uma função(callback) que recebe como parametro state e action.
//REDUCER, função "redutora". Vai entrar um estado de um jeito e ela vai devolver de "outro"
// - state é o ultimo estado da timeline
// - action é o novos dados que vão ser atualizado no estado
// Uma boa pratica é que sempre que executar a função e cair em um if action, vamos retornar um novo state para tornar sempre o ultimo imultavel.
export function timeline(state = INITIAL_STATE, action) {
    if (action.type === 'LISTAGEM') {
        //Quando alguem chamar a ação listagem, vamos retornar uma nova lista
        //Utilizando o List de immutable para sempre retornar uma nova lista
        return INITIAL_STATE.fotos = new List(action.fotos);
    }

    if (action.type === 'COMENTARIO') {
        return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
            const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario)
            return { comentarios: novosComentarios };
        })
    }

    if (action.type === 'LIKE') {
        return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
            const likeada = !fotoEstadoAntigo.likeada;
            const liker = action.liker;
            const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === liker.login);

            let novosLikers
            if (!possivelLiker) {
                //Alterar o likers de uma das fotos da timeline
                novosLikers = fotoEstadoAntigo.likers.concat(liker);
            } else {
                novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login !== liker.login);
            }

            return { likeada, likers: novosLikers };
        });
    }

    return state;
}
