// O ARQUIVO REPRESENTA TODAS FUNÇÕES REDUTORAS USADA NA STORE DO REDUX DE TIMELINE

//O redux tem a ideia de dados imutaveis. Toda store recebe uma função(callback) que recebe como parametro state e action.
//REDUCER, função "redutora". Vai entrar um estado de um jeito e ela vai devolver de "outro"
export function timeline(state = [], action) {
    if (action.type === 'LISTAGEM') {
        //Quando alguem chamar a ação listagem, vamos retornar uma nova lista   
        return action.fotos;
    }
    return state;
}
