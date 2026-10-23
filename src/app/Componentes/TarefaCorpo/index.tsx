import { Tarefa } from "@/src/types/type";
import Link from "next/link";

// Tipamos a função que será recebia via props, e os dados da tarefa para montarmos nosso corpo
type Props = {
    tarefas: Tarefa[]
    DeletarTarefa: (id: string) => void
}

function Corpo({ tarefas, DeletarTarefa }: Props) {


    return (

        <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* usamos um map para renderizar todas as tarefas */}
            {tarefas.map((tarefa: Tarefa) => (


                <section
                    key={tarefa.id}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
                >
                    <div>

                        <div className="flex justify-between items-start mb-3">
                            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1">
                                {tarefa.title}
                            </h2>
                            <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                                {tarefa.status.replace("_", " ")}
                            </span>
                        </div>


                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                            {tarefa.description}
                        </p>
                        {/* Um botão que leva para nossa tarefa detalhada que so aparece se houver mais de 30 caracteres   */}
                        {tarefa.description.length > 30 && (
                            <Link href={`tarefa/${tarefa.id}`}>
                                <button className="text-blue-500 text-sm font-semibold cursor-pointer m-0 p-0">
                                    Ler mais
                                </button>
                            </Link>
                        )}
                    </div>


                    <div className="border-t border-slate-100 dark:border-slate-700 pt-3 flex justify-between items-center text-xs text-slate-500">
                        <span className={`font-bold ${tarefa.priority === "ALTA" ? "text-red-500" :
                            tarefa.priority === "MEDIA" ? "text-amber-500" : "text-emerald-500"
                            }`}>
                            Prioridade: {tarefa.priority}
                        </span>
                        <span>
                            {new Date(tarefa.data).toLocaleDateString("pt-BR")}
                        </span>

                        <button onClick={() => DeletarTarefa(tarefa.id)} className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg shadow-md transition duration-200 cursor-pointer">
                            Deletar
                        </button>
                    </div>
                </section>
            ))}

        </div>
    );
}



export default Corpo;