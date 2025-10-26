# Documentação do PrismaAdapter - Ignite Call

## 📋 Visão Geral

O `PrismaAdapter` é um adaptador customizado para o NextAuth.js que implementa um **fluxo de autenticação em duas etapas** específico para o projeto Ignite Call. Diferente do comportamento padrão do NextAuth, este adaptador permite que o usuário se registre primeiro com um username e depois conecte sua conta Google.

## 🔄 Fluxo de Autenticação Completo

### Fase 1: Registro Inicial
```
Usuário → Página de Registro → Cria usuário parcial → Cookie '@ignitecall:userId' criado
```

### Fase 2: Conexão com Google
```
Usuário → "Conectar Google" → OAuth Google → PrismaAdapter atualiza usuário → Login completo
```

## 🚀 Sequência de Execução dos Métodos

### Durante Autenticação OAuth com Google:

```mermaid
graph TD
    A[Usuário clica "Login com Google"] --> B[OAuth Google]
    B --> C[getUserByAccount]
    C --> D{Encontrou conta?}
    D -->|Não| E[getUserByEmail]
    E --> F{Encontrou por email?}
    F -->|Não| G[createUser]
    G --> H[linkAccount]
    H --> I[createSession]
    I --> J[signIn callback]
    J --> K{Tem permissão Calendar?}
    K -->|Sim| L[Login Sucesso]
    K -->|Não| M[Redirect para erro]
    D -->|Sim| N[Usuário já conectado]
    N --> O[getSessionAndUser]
```

## 📚 Documentação Detalhada dos Métodos

### 1. `getUserByAccount({ provider, providerAccountId })`

**🎯 Quando executa:** Primeira verificação durante OAuth
**🔍 Propósito:** Verifica se já existe uma conta OAuth vinculada

```typescript
// Exemplo de execução
getUserByAccount({
  provider: "google",
  providerAccountId: "108123456789"
})
```

**💾 Query Prisma:**
```sql
SELECT * FROM accounts 
WHERE provider = 'google' 
AND provider_account_id = '108123456789'
INCLUDE user;
```

**📤 Retorno:**
- `null` - Se não encontrar (primeira conexão)
- `User` - Se encontrar conta já vinculada

---

### 2. `getUserByEmail(email)`

**🎯 Quando executa:** Se `getUserByAccount` retornar null
**🔍 Propósito:** Verifica se usuário já existe por email

```typescript
// Exemplo
getUserByEmail("usuario@gmail.com")
```

**💾 Query Prisma:**
```sql
SELECT * FROM users WHERE email = 'usuario@gmail.com';
```

**📤 Retorno:**
- `null` - Email não existe no banco
- `User` - Usuário encontrado por email

---

### 3. `createUser(user)` ⭐ **MÉTODO ESPECIAL**

**🎯 Quando executa:** Se os métodos anteriores retornarem null
**🔍 Propósito:** **ATUALIZA** usuário existente (não cria novo!)

```typescript
// Dados vindos do Google
const googleUser = {
  name: "João Silva",
  email: "joao@gmail.com", 
  avatar_url: "https://lh3.googleusercontent.com/..."
}
```

**🍪 Dependência de Cookie:**
```javascript
// Cookie criado no registro inicial
"@ignitecall:userId": "clx7h2k3l0000..."
```

**💾 Query Prisma:**
```sql
UPDATE users SET
  name = 'João Silva',
  email = 'joao@gmail.com',
  avatar_url = 'https://...'
WHERE id = 'clx7h2k3l0000...';
```

**🧹 Limpeza:**
```typescript
// Remove cookie após uso
destroyCookie({ res }, '@ignitecall:userId', { path: '/' })
```

**📤 Retorno usado pelo NextAuth:**
```typescript
{
  id: "clx7h2k3l0000...",     // ← Usado no linkAccount
  name: "João Silva",
  username: "joao.silva",      // ← Mantém username original
  email: "joao@gmail.com",
  emailVerified: null
}
```

---

### 4. `linkAccount(account)`

**🎯 Quando executa:** Após `createUser` retornar com sucesso
**🔍 Propósito:** Vincula conta Google ao usuário

**📥 Dados recebidos:**
```typescript
{
  userId: "clx7h2k3l0000...",        // ← Do createUser
  type: "oauth",
  provider: "google",
  providerAccountId: "108123456789",
  access_token: "ya29.a0Ae4lv...",
  refresh_token: "1//04...",
  scope: "openid email profile https://www.googleapis.com/auth/calendar",
  // ... outros campos OAuth
}
```

**💾 Query Prisma:**
```sql
INSERT INTO accounts (
  user_id, type, provider, provider_account_id,
  access_token, refresh_token, scope, ...
) VALUES (...);
```

---

### 5. `createSession({ userId, expires, sessionToken })`

**🎯 Quando executa:** Após `linkAccount` completar
**🔍 Propósito:** Cria sessão ativa para o usuário

**💾 Query Prisma:**
```sql
INSERT INTO sessions (user_id, session_token, expires) 
VALUES ('clx7h2k3l0000...', 'session-abc123', '2024-12-26 10:00:00');
```

---

### 6. `getSessionAndUser(sessionToken)`

**🎯 Quando executa:** A cada requisição autenticada
**🔍 Propósito:** Valida sessão e retorna dados do usuário

**💾 Query Prisma:**
```sql
SELECT s.*, u.* FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.session_token = 'session-abc123';
```

---

### 7. Métodos de Suporte

#### `getUser(id)`
- **Uso:** Buscar usuário por ID específico
- **Contexto:** Validações e operações internas do NextAuth

#### `updateUser(user)`  
- **Uso:** Atualizar dados do usuário
- **Contexto:** Quando usuário modifica perfil

#### `updateSession(session)`
- **Uso:** Renovar sessão (principalmente expires)
- **Contexto:** Refresh de sessões ativas

## 🔧 Configuração NextAuth

### Callbacks Importantes

```typescript
callbacks: {
  // Valida permissões do Google Calendar
  async signIn({ account }) {
    if (!account?.scope?.includes("https://www.googleapis.com/auth/calendar")) {
      return "/register/connect-calendar/?error=permissions";
    }
    return true;
  },

  // Adiciona ID do usuário na sessão
  async session({ session, user }) {
    return {
      ...session,
      user: {
        ...session.user,
        id: user.id,  // ← Do getSessionAndUser
      },
    };
  }
}
```

## 🗃️ Estrutura do Banco de Dados

### Tabela `users`
```sql
id          STRING    -- PK
username    STRING    -- Criado no registro inicial
name        STRING    -- Atualizado pelo Google
email       STRING    -- Atualizado pelo Google  
avatar_url  STRING    -- Atualizado pelo Google
created_at  DATETIME
```

### Tabela `accounts`
```sql
id                   STRING    -- PK
user_id              STRING    -- FK para users.id
type                 STRING    -- "oauth"
provider             STRING    -- "google"
provider_account_id  STRING    -- ID do Google
access_token         TEXT      -- Token de acesso
refresh_token        TEXT      -- Token de refresh
scope                TEXT      -- Permissões
expires_at           INT       -- Timestamp de expiração
-- Constraint UNIQUE(provider, provider_account_id)
```

### Tabela `sessions`
```sql
id            STRING    -- PK
user_id       STRING    -- FK para users.id  
session_token STRING    -- Token único da sessão
expires       DATETIME  -- Data de expiração
```

## 🎯 Pontos Importantes

### ✅ Diferenças do Padrão NextAuth

1. **createUser atualiza em vez de criar**
2. **Depende de cookie para ID do usuário**
3. **Mantém username do registro inicial**
4. **Campos customizados (avatar_url vs image)**

### ⚠️ Considerações de Segurança

1. **Cookie `@ignitecall:userId` é crítico** - sem ele o fluxo falha
2. **Validação de permissões Google Calendar** no callback `signIn`
3. **Limpeza automática do cookie** após uso

### 🔄 Fluxo de Erro

Se cookie não existir:
```
createUser() → throw Error("User ID not found in cookies.")
→ Usuário redirecionado para página de erro
→ Deve fazer registro completo novamente
```

## 📖 Exemplo Completo de Uso

```typescript
// 1. Usuário se registra
POST /api/users → Cria usuário com username → Cookie criado

// 2. Usuário conecta Google
GET /api/auth/signin/google → OAuth flow inicia

// 3. Durante OAuth (sequência automática):
getUserByAccount() → null (primeira vez)
getUserByEmail() → null ou User
createUser() → Atualiza usuário do cookie
linkAccount() → Vincula conta Google  
createSession() → Cria sessão

// 4. Validação
signIn callback → Verifica permissões Calendar

// 5. Sessão ativa
getSessionAndUser() → Valida a cada request
```

Este fluxo garante que cada usuário tenha um username único (do registro) combinado com dados completos do Google (OAuth), criando uma experiência de usuário fluida e segura.