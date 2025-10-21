# Roadmap do Projeto: InsightScribe MVP

**Objetivo Final:** Lançar uma aplicação web funcional onde usuários podem se cadastrar, usar uma ferramenta de IA para gerar conteúdo (com um limite de créditos), e assinar um plano pago para obter mais acesso.
**Stack de Tecnologia:** Next.js, TypeScript, Tailwind CSS v3, PostgreSQL, Stripe, Vercel.
**Metodologia:** Agile (Sprints semanais).

---

### **Semana 1 (15/Out - 19/Out): A Fundação Correta**
* **Objetivo:** Estabelecer uma base de projeto 100% estável e funcional, com a stack de tecnologia correta.
* **Entregáveis-Chave:**
    * [x] Repositório do GitHub configurado.
    * [x] Projeto Next.js inicializado com Tailwind CSS v3 estável.
    * [x] Quadro de gerenciamento de tarefas (GitHub Projects) configurado.
    * [x] Estilos globais limpos e layout principal da aplicação definido.
    * [x] Roadmap do projeto adicionado ao repositório.

---

### **Semana 2 (20/Out - 26/Out): Autenticação de Usuários**
* **Objetivo:** Implementar um sistema de autenticação robusto, suportando tanto email/senha quanto logins sociais (OAuth).
* **Entregáveis-Chave:**
    * [x] Criar a UI para a página de Cadastro (`/sign-up`).
    * [x] Construir o endpoint da API para registro manual (criação de usuário e criptografia de senha).
    * [x] Criar a UI para a página de Login (`/sign-in`).
    * [ ] Construir o endpoint da API para login manual (verificação de usuário e senha).
    * [ ] Integrar a biblioteca `Auth.js` (NextAuth.js) para gerenciar todo o fluxo de autenticação.
    * [ ] Adicionar o provedor de login social (OAuth) com o Google.
    * [ ] Configurar rotas protegidas e gerenciamento de sessão.

---

### **Semana 3 (27/Out - 02/Nov): Funcionalidade Principal de IA**
* **Objetivo:** Integrar a API de IA e permitir a geração de conteúdo.

---

### **Semana 4 (03/Nov - 09/Nov): Sistema de Créditos**
* **Objetivo:** Implementar a lógica de limitação de uso.

---

### **Semana 5 (10/Nov - 16/Nov): Estrutura de Pagamentos**
* **Objetivo:** Preparar a integração com o Stripe.

---

### **Semana 6 (17/Nov - 23/Nov): Ciclo de Assinatura Completo**
* **Objetivo:** Finalizar e testar o fluxo de pagamento.

---

### **Semana 7 (24/Nov - 30/Nov): Refinamento e UX**
* **Objetivo:** Polir a aplicação e criar a Landing Page.

---

### **Semana 8 (01/Dez - 07/Dez): Lançamento**
* **Objetivo:** Deploy e teste final em produção.