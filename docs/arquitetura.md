# Arquitetura

## Stack

- **Next.js 14** com App Router.
- **React 18**.
- **TypeScript** com tipagem explícita.
- **TailwindCSS** para layout e estilos.
- **Lucide React** para ícones.
- Utilitários locais para `className`, moeda, datas e identificação de reservas.

## Organização de pastas

- `app/` — rotas e páginas.
- `components/` — componentes compartilhados.
- `lib/` — tipos, utilitários e dados mockados.
- `docs/` — documentação do projeto.

## Camadas principais

### 1. Rotas da aplicação

As páginas do App Router cobrem o fluxo principal:

- `/` — página inicial.
- `/search` — catálogo e filtros.
- `/toy/[slug]` — detalhes do brinquedo.
- `/booking` — dados da reserva.
- `/payment` — pagamento simulado.
- `/confirmation/[bookingId]` — confirmação da reserva.
- `/bookings` — minhas reservas.
- `not-found` — 404 personalizada.

### 2. Estado global

O estado global fica em `components/app-provider.tsx`.

Ele administra:

- `draft` — rascunho atual da reserva.
- `bookings` — lista de reservas confirmadas, pendentes e canceladas.
- `setSelection()` — define brinquedo, data e horário.
- `updateDraft()` — atualiza campos do formulário.
- `createBooking()` — gera uma nova reserva.
- `cancelBooking()` — cancela uma reserva existente.
- `clearDraft()` — limpa o rascunho.
- `findBooking()` — busca uma reserva por ID.

O estado é persistido em `localStorage` com a chave `vaidebrinks-state`.

### 3. Dados mockados

O arquivo `lib/mock-data.ts` concentra:

- fornecedores;
- brinquedos;
- avaliações;
- reservas iniciais;
- funções auxiliares de disponibilidade;
- listas de tipos de evento, categorias e faixas de preço.

### 4. Componentes compartilhados

Os componentes em `components/` concentram a UI reutilizável:

- `ui.tsx` — botão, card, input, badge, section header, empty state e outros elementos base.
- `marketplace.tsx` — cartões de brinquedo, seletor de disponibilidade, formulário de reserva, pagamento e linha de reserva.
- `site-shell.tsx` — cabeçalho, navegação e rodapé.

## Fluxo de dados

1. O usuário escolhe um brinquedo e um horário.
2. O `AppProvider` salva a seleção no rascunho.
3. O formulário de reserva completa os dados da festa.
4. A tela de pagamento simula a finalização.
5. A reserva é criada e persistida no estado local.
6. A página de confirmação exibe o resultado final.
7. A área de reservas permite acompanhar e cancelar itens.

## Convenções técnicas

- Os componentes usam tipagem explícita.
- O layout global define `lang="pt-BR"`.
- As datas e valores monetários são formatados para o Brasil.
- Os textos públicos são traduzidos para português do Brasil.
