"use client";

import Header from "./Componentes/Header";
import Modal from "./Componentes/Modal";
import Corpo from "./Componentes/TarefaCorpo";
import { useReducer, useState, useEffect } from "react";
import ReducerTarefa, { State, StateAction } from "@/src/types/type";
// Definimos o estado inicial do useReducer
const estadoInicial: State = {
  Tarefa: [],
  searchTerm: "",
};


export default function Home() {
  // Definimos os estados locais para controlar a exibição do modal e os campos do formulário  
  const [aba, setAba] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [prioridade, setPrioridade] = useState<"BAIXA" | "MEDIA" | "ALTA">("BAIXA");
  const [status, setStatus] = useState<"A_FAZER" | "EM ANDAMENTO" | "CONCLUÍDO">("A_FAZER");

  // Chamamos o useReducer para gerenciar o estado das tarefas, passando nossa função de reducer e o estado inicial
  const [state, dispatch] = useReducer(ReducerTarefa, estadoInicial);

  // Uma flag para garantir que os dados sejam carregados do localStorage apenas uma vez
  const [carregado, setCarregado] = useState(false);

  // Aqui usamos o useEffect para carregar as tarefas do localStorage quando a pagina e carregada 
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("nextstep_tasks");
    if (dadosSalvos) {
      const tarefasConstatadas = JSON.parse(dadosSalvos);


      tarefasConstatadas.forEach(() => {
        dispatch({
          type: "GET_TASKS",
          payload: tarefasConstatadas


        });
      });
    }
    setCarregado(true);
  }, []);

  // Aqui usamos outro useEffect para salvar as tarefas no localStorage sempre que o estado das tarefas mudar, mas apenas se os dados já tiverem sido carregados
  useEffect(() => {
    if (carregado) {
      localStorage.setItem("nextstep_tasks", JSON.stringify(state.Tarefa));
    }
  }, [state.Tarefa, carregado]);

  // Uma função para controlar o envio do formulário, que previne o comportamento padrão,valida se os campos estão preenchidos, reseta o formulário, fecha o modal e despacha a ação de adicionar uma nova tarefa  
  function EnvioFormulario(e: React.FormEvent<HTMLFormElement>) {
    if (!titulo || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    e.preventDefault();
    e.currentTarget.reset();
    setAba(false);
    console.log("Formulário enviado!");
    console.log(state.Tarefa);

    dispatch({
      type: "ADD_TASK",
      payload: {
        title: titulo,
        description: descricao,
        priority: prioridade,
        status: status
      }

    });
  }
  // Aqui filtramos as tarefas com base no termo de pesquisa armazenado no estado
  const tarefasFiltradas = state.Tarefa.filter((tarefa) => {

    return tarefa.priority.toLowerCase().includes(state.searchTerm.toLowerCase()) || tarefa.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || tarefa.status.toLowerCase().includes(state.searchTerm.toLowerCase());
  });
  // Função que enviamos via props para o componente Header para atualizar o termo de pesquisa no estado global
  function FiltroTarefas(filtro: string) {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: filtro
    });
  }
  // Outra função que enviamos via props para o componente Corpo para deletar uma tarefa específica com base no seu ID
  function DeletarTarefa(id: string) {
    dispatch({
      type: "DELETE_TASK",
      payload: id
    });
  }

  return (
    <main>
      <Header filtroTarefas={FiltroTarefas} />
      <Corpo tarefas={tarefasFiltradas} DeletarTarefa={DeletarTarefa} />
      <Modal
        setAba={setAba}
        Aba={aba}
        envioFormulario={EnvioFormulario}
        setTitulo={setTitulo}
        setDescricao={setDescricao}
        setPrioridade={setPrioridade}
        setStatus={setStatus}
        titulo={titulo}
        descricao={descricao}
        prioridade={prioridade}
        status={status}
        
      />

    </main>
  );
}


