# 🎨 **ArtGallery - Galeria de Arte Pessoal**

Uma aplicação moderna para explorar, descobrir e favoritar obras de arte do Metropolitan Museum of Art.

## ✨ **Características**

- 🖼️ **Galeria de Arte**: Explore obras clássicas e contemporâneas
- 🔍 **Busca Inteligente**: Encontre obras por artista, título ou período
- ❤️ **Sistema de Favoritos**: Crie sua coleção pessoal
- 📱 **Interface Responsiva**: Funciona perfeitamente em todos os dispositivos
- 🚀 **Performance Otimizada**: Carregamento rápido e cache inteligente
- 🛡️ **Fallback Inteligente**: Funciona mesmo sem o back-end

## 🚀 **Começando Rápido**

### **Pré-requisitos**

- Node.js 16+
- npm ou yarn
- Back-end configurado (opcional para desenvolvimento)

### **Instalação**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/galeria-arte-pessoal.git
   cd galeria-arte-pessoal/front-end-galeria
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   ```bash
   cp ENV_EXAMPLE.md .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm start
   ```

5. **Abra no navegador:**
   ```
   http://localhost:3000
   ```

## 🌍 **Configuração do Ambiente**

### **Variáveis de Ambiente**

| Variável                 | Descrição              | Padrão                  |
| ------------------------ | ---------------------- | ----------------------- |
| `REACT_APP_API_URL`      | URL da API do back-end | `http://localhost:3001` |
| `REACT_APP_USE_FALLBACK` | Usar dados de fallback | `false`                 |
| `REACT_APP_DEBUG`        | Modo debug             | `false`                 |

### **Configurações por Ambiente**

#### **Desenvolvimento Local**

```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USE_FALLBACK=true
REACT_APP_DEBUG=true
```

#### **Produção**

```bash
REACT_APP_API_URL=https://sua-api.railway.app
REACT_APP_USE_FALLBACK=false
REACT_APP_DEBUG=false
```

## 🏗️ **Arquitetura**

### **Estrutura de Pastas**

```
src/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes comuns (Loading, Modal, etc.)
│   ├── gallery/        # Componentes da galeria
│   └── layout/         # Componentes de layout (Header, Footer)
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API e fallback
├── store/              # Estado global (Redux Toolkit)
├── types/              # Definições de tipos TypeScript
├── config/             # Configurações de ambiente
└── routes/             # Configuração de rotas
```

### **Fluxo de Dados**

```
Front-end → artworkService → Back-end → Metropolitan Museum API
                ↓
            fallbackService (quando necessário)
```

## 🔧 **Desenvolvimento**

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento
npm run build          # Build para produção
npm run test           # Executa testes
npm run type-check     # Verifica tipos TypeScript
npm run lint           # Executa linter
```

### **Tecnologias Utilizadas**

- **Frontend**: React 18 + TypeScript
- **Estado**: Redux Toolkit
- **Estilização**: Tailwind CSS
- **Roteamento**: React Router v6
- **Ícones**: Heroicons
- **Build**: Vite

## 📱 **Funcionalidades**

### **1. Página Inicial**

- Apresentação da aplicação
- Cards informativos sobre funcionalidades
- Botão de call-to-action

### **2. Galeria**

- **Carregamento Automático**: Obras clássicas carregadas automaticamente
- **Busca Inteligente**: Filtros por artista, período, meio
- **Paginação**: Navegação por páginas
- **Fallback**: Dados de exemplo quando back-end não disponível

### **3. Sistema de Favoritos**

- **Adicionar/Remover**: Gerenciar obras favoritas
- **Coleção Pessoal**: Visualizar favoritos salvos
- **Sincronização**: Dados salvos no back-end

### **4. Perfil do Usuário**

- **Estatísticas**: Contagem de favoritos
- **Informações**: Dados da conta
- **Ações Rápidas**: Links para funcionalidades principais

## 🔌 **Integração com Back-end**

### **Endpoints Necessários**

#### **Rotas Públicas**

- `GET /api/artworks` - Listar obras
- `GET /api/artworks/:id` - Detalhes da obra
- `POST /api/artworks/search` - Buscar obras
- `GET /api/artworks/classics` - Obras clássicas

#### **Rotas Protegidas**

- `POST /api/favorites` - Adicionar favorito
- `GET /api/favorites` - Listar favoritos
- `DELETE /api/favorites/:id` - Remover favorito

### **Especificações Completas**

Veja o arquivo `BACKEND_API_SPECS.md` para detalhes completos da API.

## 🎯 **Sistema de Fallback**

### **Quando é Usado**

- Back-end não disponível
- Erros de conexão
- Desenvolvimento local (configurável)

### **Dados de Exemplo**

- 6 obras clássicas de Van Gogh
- Busca e filtros funcionais
- Simulação de delays de rede

### **Configuração**

```bash
# Habilitar fallback em desenvolvimento
REACT_APP_USE_FALLBACK=true
```

## 🧪 **Testes**

### **Executar Testes**

```bash
npm test                    # Executa todos os testes
npm run test:watch         # Modo watch
npm run test:coverage      # Com cobertura
```

### **Estrutura de Testes**

```
src/
├── __tests__/            # Testes organizados por funcionalidade
├── components/           # Testes dos componentes
└── services/            # Testes dos serviços
```

## 🚀 **Deploy**

### **Build para Produção**

```bash
npm run build
```

### **Verificar Build**

```bash
npm run preview
```

### **Plataformas Recomendadas**

- **Vercel**: Deploy automático do Git
- **Netlify**: Deploy com preview
- **Railway**: Deploy full-stack
- **Heroku**: Deploy tradicional

## 📊 **Monitoramento**

### **Métricas Recomendadas**

- Performance de carregamento
- Taxa de erro das APIs
- Uso do sistema de fallback
- Tempo de resposta do back-end

### **Logs**

- Erros de API
- Uso de fallback
- Performance de busca
- Ações do usuário

## 🤝 **Contribuição**

### **Como Contribuir**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### **Padrões de Código**

- TypeScript strict mode
- ESLint + Prettier
- Conventional Commits
- Testes para novas funcionalidades

## 📝 **Changelog**

### **v1.0.0** (Atual)

- ✅ Sistema de galeria funcional
- ✅ Busca de obras de arte
- ✅ Sistema de favoritos
- ✅ Interface responsiva
- ✅ Sistema de fallback
- ✅ Integração com Metropolitan Museum API

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 **Agradecimentos**

- **Metropolitan Museum of Art** pela API pública
- **React Team** pelo framework incrível
- **Tailwind CSS** pela estilização
- **Heroicons** pelos ícones

## 📞 **Suporte**

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/galeria-arte-pessoal/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/galeria-arte-pessoal/wiki)
- **Email**: seu-email@exemplo.com

---

**Desenvolvido com ❤️ para a comunidade de arte**
