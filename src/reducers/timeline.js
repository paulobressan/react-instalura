// O ARQUIVO REPRESENTA TODAS FUNÇÕES REDUTORAS USADA NA STORE DO REDUX DE TIMELINE

//O redux tem a ideia de dados imutaveis. Toda store recebe uma função(callback) que recebe como parametro state e action.
//REDUCER, função "redutora". Vai entrar um estado de um jeito e ela vai devolver de "outro"
// - state é o ultimo estado da timeline
// - action é o novos dados que vão ser atualizado no estado
// Uma boa pratica é que sempre que executar a função e cair em um if action, vamos retornar um novo state para tornar sempre o ultimo imultavel.
export function timeline(state = [], action) {
    if (action.type === 'LISTAGEM') {
        //Quando alguem chamar a ação listagem, vamos retornar uma nova lista   
        return action.fotos;
    }

    if (action.type === 'COMENTARIO') {
        const fotoAchada = state.find(foto => foto.id === action.fotoId)
        fotoAchada.comentarios.push(action.novoComentario)
        return state;
    }

    if (action.type === 'LIKE') {
        const fotoAchada = state.find(foto => foto.id === action.fotoId)
        const liker = action.liker;

        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

        fotoAchada.likeada = !fotoAchada.likeada;

        if (!possivelLiker) {
            //Alterar o likers de uma das fotos da timeline
            fotoAchada.likers.push(liker);
        } else {
            const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
            fotoAchada.likers = novosLikers;
        }
        return state;
    }

    return state;
}
