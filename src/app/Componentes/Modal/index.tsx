
// Tipamos as informações que serão recebidas via props 

type Props = {
    setAba: React.Dispatch<React.SetStateAction<boolean>>
    Aba: boolean
    envioFormulario: (e: React.FormEvent<HTMLFormElement>) => void
    setTitulo: React.Dispatch<React.SetStateAction<string>>
    setDescricao: React.Dispatch<React.SetStateAction<string>>
    setPrioridade: React.Dispatch<React.SetStateAction<"BAIXA" | "MEDIA" | "ALTA">>
    setStatus: React.Dispatch<React.SetStateAction<"A_FAZER" | "EM ANDAMENTO" | "CONCLUÍDO">>
    titulo: string
    descricao: string
    prioridade: "BAIXA" | "MEDIA" | "ALTA"
    status: "A_FAZER" | "EM ANDAMENTO" | "CONCLUÍDO"
 }
 // Nosso modal que recebe diversos setStates, e função de controle de formulario
function Modal({setAba, Aba, envioFormulario, setTitulo, setDescricao, setPrioridade, setStatus, titulo, descricao, prioridade, status  }: Props) {
 
   return (
    <div className="p-3 h-40 font-sans">
      
      
      <button 
        onClick={() => setAba(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 cursor-pointer"
      >
        + adicionar tarefa
      </button>

      
      <div 
        onClick={(e) => e.target === e.currentTarget && setAba(false)}
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300 ${
          Aba ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        
        
        <div 
          className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 relative transition-all duration-300 transform ${
            Aba ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          
          
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preencha seus dados</h3>
            <button 
              onClick={() => setAba(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl font-semibold cursor-pointer"
            >
              &times;
            </button>
          </div>

        
          <form onSubmit={envioFormulario} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Tarefa</label>
              <input  type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />

              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
           </div>
             
             <p className="block text-sm font-medium text-gray-700 mb-1">Prioridade</p>
             <select value={prioridade} onChange={(e) => setPrioridade(e.target.value as any)} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
              
              <p className="block text-sm font-medium text-gray-700 mb-1">Status</p>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="A FAZER">A Fazer</option>
                <option value="EM ANDAMENTO">Em Andamento</option>
                <option value="CONCLUÍDO">Concluído</option>
              </select>
              
              <div className="flex justify-end space-x-3 pt-2">
              <button 
                type="button" 
                onClick={() => setAba(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
     );
}

export default Modal;