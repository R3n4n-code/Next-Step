# ✅ NextStep — Gerenciador de Projetos (Kanban PWA)

O **NextStep** é uma aplicação moderna e interativa para gerenciamento de projetos em estilo Kanban. Este projeto foi desenvolvido focado em boas práticas de engenharia de software para se tornar uma aplicação mobile-first robusta, totalmente tipada, instalável como PWA e resiliente a falhas de conexão por meio de persistência offline.

## </> Link do Projeto no Ar
👉 [Acesse a aplicação na Vercel aqui](https://next-step-one-jade.vercel.app/)

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

### Core & Interface
*   **Next.js (App Router):** Framework padrão de mercado para renderização otimizada, roteamento dinâmico unificado e alta performance.
*   **TypeScript:** Tipagem estática avançada em todo o fluxo de dados do painel, mitigando comportamentos inesperados em tempo de compilação.
*   **Tailwind CSS:** Utilitários de estilização integrados para a construção de uma interface fluida, moderna e totalmente responsiva.

### Qualidade de Código
*   **ESLint:** Linter para garantir padrões rígidos de sintaxe, guias de estilo de mercado e prevenção de quebras das regras de React Hooks.

---

## Estrutura do Projeto

### 1. Centralização de Estado Complexo (useReducer)
Toda a lógica de manipulação das tarefas (Criar, Mover, Deletar) foi completamente removida do escopo comum dos componentes e encapsulada em uma máquina de estados finitos previsível via `useReducer`. Isso garante uma barreira contra efeitos colaterais indesejados e centraliza as regras de negócio em um único manipulador lógico.

### 3. Roteamento Dinâmico Inteligente (`[id]`)
Utilização de rotas dinâmicas do Next.js para isolamento de contextos. A página `/tarefa/[id]` intercepta o identificador único diretamente da URL, realizando leituras e atualizações granulares de dados específicos da tarefa sem onerar o carregamento do painel principal (Kanban).

### 4. Ciclo de Vida Assíncrono e Estratégia de Hidratação
A sincronização com o banco local (`localStorage`) foi projetada respeitando o comportamento do Next.js. O estado inicial nasce limpo para evitar erros de hidratação (*SSR vs Client*), e os dados persistidos são injetados em um segundo momento de forma limpa por meio da action especializada `HYDRATE_TASKS`.

---

## 🔧 Configuração da PWA e Cache Offline

O aplicativo está configurado para adotar uma postura resiliente de cache. O manifesto define propriedades de display autônomo (*standalone*) e o travamento de zoom máximo garante a sensação de usabilidade idêntica a de um aplicativo mobile nativo. Tudo funciona offline.

---

## 💻 Como Rodar o Projeto Localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Para testar o comportamento real da PWA (Gerando os arquivos de Service Worker no diretório `public/`), execute o build de produção:
   ```bash
   npm run build
   npm start
   ```

---

Desenhado e desenvolvido por **Renan Mezzacapa** 🚀. Conecte-se comigo no [LinkedIn](seu-link-do-linkedin).
