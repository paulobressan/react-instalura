export function notificacao(state = '', action) {
    if (action.type === 'NOTIFICAR') {
        return action.mensagem;
    }

    return state;
}