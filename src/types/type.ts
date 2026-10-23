// Tipamos uma interface para representar a estrutura de uma tarefa
export interface Tarefa {
  id: string;
  title: string;
  description: string;
  priority: "BAIXA" | "MEDIA" | "ALTA";
  status: "A_FAZER" | "EM ANDAMENTO" | "CONCLUÍDO";
  data: string;
}
// Tipamos o estado inicial do nosso aplicativo
export interface State {
  Tarefa: Tarefa[];
  searchTerm: string;
}
// Aqui definimos as ações que podem ser realizadas no estado
export type StateAction =

  | { type: "ADD_TASK"; payload: Omit<Tarefa, "id" | "data"> }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "FILTER_TASKS"; payload: string }
  | { type: "GET_TASKS"; payload: Tarefa[] }
  | { type: "EDIT_TASK"; payload: Tarefa };

// Aqui criamos uma função que executa as ordens bastando apenas enviar os dados corretos para ela.

  export function ReducerTarefa(state: State, action: StateAction) {
    switch (action.type) {
      case "ADD_TASK":
        const NovaTarefa: Tarefa = {
          title: action.payload.title,
          description: action.payload.description,
          priority: action.payload.priority,
          status: action.payload.status,
          id: crypto.randomUUID(),
          data: new Date().toISOString(),
        };
        return { ...state, Tarefa: [...state.Tarefa, NovaTarefa] };
      
      case "DELETE_TASK":
        return {
          ...state,
          Tarefa: state.Tarefa.filter(task => task.id !== action.payload)
        };
      case "SET_SEARCH_TERM":
        return {
          ...state,
          searchTerm: action.payload
        };
      case "GET_TASKS":
  return { ...state, Tarefa: action.payload };  
       case "EDIT_TASK":
        return {
          ...state,
          Tarefa: state.Tarefa.map(task =>
            task.id === action.payload.id ? { ...task, ...action.payload } : task
          )
        };
      default:
        return state;
      }
      }


export default ReducerTarefa;      