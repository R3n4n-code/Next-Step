import Image from "next/image";

// Tipamos a função de filtro que será recebida via props 
type Props = {
  filtroTarefas: (filtro: string) => void;
};

// Nosso Header funcional
function Header({ filtroTarefas }: Props) {
return (
    <header className="flex items-center bg-indigo-600 text-white p-4 h-full shadow-xl/20">
      <nav className="flex items-baseline mr-auto space-x-4">
        
        <input type="text" placeholder="Pesquisar..." onChange={(e) => filtroTarefas(e.target.value)} className="bg-indigo-400 rounded-md text-white placeholder:pl-2 placeholder:text-indigo-300 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-white"/>
        <select onChange={(e) => filtroTarefas(e.target.value)} className="bg-indigo-400 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer">
            <option value="">☰ Filtro</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
        </select>
      </nav>

        <div className="flex justify-end items-end">
      <Image src="/icons/icon-192x192.png" alt="NextStep Logo" className="flex mr-2" width={32} height={32} />
      <h1 className="text-xl font-bold">NextStep</h1>
      </div>
      
    </header>
  );
}

export default Header;