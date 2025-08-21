# 🌍 Variáveis de Ambiente

## **Configuração do Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# Configurações da API
REACT_APP_API_URL=http://localhost:3001

# Configurações de desenvolvimento
REACT_APP_USE_FALLBACK=true

# Configurações de produção
# REACT_APP_USE_FALLBACK=false

# Configurações de debug
REACT_APP_DEBUG=false

# Configurações de cache
REACT_APP_CACHE_TTL=86400000

# Configurações de timeout
REACT_APP_API_TIMEOUT=10000
```

## **Descrição das Variáveis**

### **REACT_APP_API_URL**

- **Descrição**: URL base da API do back-end
- **Padrão**: `http://localhost:3001`
- **Exemplo**: `https://sua-api.railway.app`

### **REACT_APP_USE_FALLBACK**

- **Descrição**: Habilita o uso de dados de fallback quando o back-end não estiver disponível
- **Valores**: `true` ou `false`
- **Padrão**: `false` (em produção sempre será false)

### **REACT_APP_DEBUG**

- **Descrição**: Habilita logs de debug adicionais
- **Valores**: `true` ou `false`
- **Padrão**: `false`

### **REACT_APP_CACHE_TTL**

- **Descrição**: Tempo de vida do cache em milissegundos
- **Padrão**: `86400000` (24 horas)
- **Exemplo**: `3600000` (1 hora)

### **REACT_APP_API_TIMEOUT**

- **Descrição**: Timeout das requisições para a API em milissegundos
- **Padrão**: `10000` (10 segundos)
- **Exemplo**: `5000` (5 segundos)

## **Configurações por Ambiente**

### **Desenvolvimento Local**

```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USE_FALLBACK=true
REACT_APP_DEBUG=true
```

### **Produção**

```bash
REACT_APP_API_URL=https://sua-api.railway.app
REACT_APP_USE_FALLBACK=false
REACT_APP_DEBUG=false
```

## **Como Usar**

1. **Copie o arquivo de exemplo:**

   ```bash
   cp ENV_EXAMPLE.md .env
   ```

2. **Edite o arquivo `.env`** com suas configurações

3. **Reinicie o servidor** de desenvolvimento:
   ```bash
   npm start
   ```

## **Notas Importantes**

- ⚠️ **Nunca commite** o arquivo `.env` no Git
- 🔒 **Use HTTPS** em produção
- 🧪 **Teste** as configurações antes do deploy
- 📝 **Documente** mudanças nas configurações
