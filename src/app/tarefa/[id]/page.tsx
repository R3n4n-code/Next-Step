"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tarefa } from "@/src/types/type";

// Componente de Detalhes da Tarefa
export default function DetalheTarefa() {
  const params = useParams();
  const router = useRouter();
  // Estado local para armazenar a tarefa detalhada
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  // Estado local para controlar se estamos editando a tarefa
  const [editando, setEditando] = useState<boolean>(false);
  // useEffect para buscar a tarefa no localStorage quando o componente é montado ou quando o ID da tarefa mudar
  useEffect(() => {

    const dadosSalvos = localStorage.getItem("nextstep_tasks");

    if (dadosSalvos) {
      const listasDeTarefas: Tarefa[] = JSON.parse(dadosSalvos);

      const tarefaEncontrada = listasDeTarefas.find((tarefa) => tarefa.id === params.id);

      if (tarefaEncontrada) {
        setTarefa(tarefaEncontrada);
      }
    }
  }, [params.id]);
  // Aqui temos uma função que atualiza nosso localStorage com as edições que o usuario fazer
  const salvarAlteracao = () => {
    if (!tarefa) return;

    const dadosSalvos = localStorage.getItem("nextstep_tasks");
    if (dadosSalvos) {
      const listasDeTarefas: Tarefa[] = JSON.parse(dadosSalvos);


      const listaAtualizada = listasDeTarefas.map((t) =>
        t.id === tarefa.id ? tarefa : t
      );


      localStorage.setItem("nextstep_tasks", JSON.stringify(listaAtualizada));
    }

    setEditando(false);


  };
  // Uma validação caso a tarefa não exista ou caso demore alguns estantes para ela aparecer
  if (!tarefa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-600 mb-4">Tarefa não encontrada ou carregando...</p>
        <button onClick={() => router.push("/")} className="text-blue-600 underline">
          Voltar para o início
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-slate-100 dark:border-slate-700">


        <button
          onClick={() => router.push("/")}
          className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 cursor-pointer mb-6 flex items-center gap-1"
        >
          ← Voltar para a Home
        </button>


        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {tarefa.title}
          </h1>
          <span className="text-sm font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            {tarefa.status.replace("_", " ")}
          </span>
        </div>


        <div className="flex gap-4 mb-6 text-sm">
          <p className="text-slate-500">
            Prioridade:{" "}
            <span className={`font-bold ${tarefa.priority === "ALTA" ? "text-red-500" :
                tarefa.priority === "MEDIA" ? "text-amber-500" : "text-emerald-500"
              }`}>
              {tarefa.priority}
            </span>
          </p>
          <p className="text-slate-500">•</p>
          <p className="text-slate-500">
            Criado em: {new Date(tarefa.data).toLocaleDateString("pt-BR")}
          </p>
        </div>
        {/* Aqui usamos o operador ternário para que apareça ou não certas partes do codigo para a edição */}
        {!editando ? (
          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              Descrição Completa
            </h3>
            <p className="text-slate-700 dark:text-slate-300 ">
              {tarefa.description}
            </p>
          </div>
        ) : (
          <textarea
            placeholder="Editar descrição..."
            value={tarefa.description}
            onChange={(e) => setTarefa({ ...tarefa, description: e.target.value })}
            className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full rounded-lg p-3 resize-none h-40"
          />
        )}
        {/* Usamos novamente o operador ternário para que nosso botão saiba quando chamar nossa função para salvar o que o usuario digitou     */}
        <button onClick={editando ? salvarAlteracao : () => setEditando(true)}
          className={`flex ml-auto mt-1 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 cursor-pointer ${editando ? "bg-green-500 hover:bg-green-600 text-black" : "bg-amber-50 hover:bg-amber-200 text-black"}`}>
          {editando ? "Salvar Alterações" : "Editar Tarefa"}
        </button>
      </div>
    </main>
  );
}
