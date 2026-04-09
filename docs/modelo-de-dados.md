# Modelo de dados

## Tipos centrais

O arquivo `lib/types.ts` define a base do domínio da aplicação.

### Principais entidades

- `Toy` — brinquedo do catálogo.
- `Provider` — fornecedor do brinquedo.
- `Booking` — reserva finalizada ou em andamento.
- `BookingDraft` — rascunho preenchido antes da confirmação.
- `ToySchedule` — datas e horários disponíveis por brinquedo.
- `TimeSlot` — um horário individual.
- `AppState` — estado persistido da aplicação.

## Status de horário

Os horários usam três estados:

- `available` — disponível.
- `limited` — com poucas vagas.
- `sold_out` — esgotado.

## Status de reserva

As reservas usam os seguintes status:

- `confirmed` — confirmada.
- `pending` — pendente.
- `canceled` — cancelada.

## Dados mockados

O arquivo `lib/mock-data.ts` contém o catálogo e os registros iniciais.

### Conteúdo incluído

- fornecedores com tempo de resposta e especialidades;
- brinquedos com nome, categoria, resumo, descrição, preço e destaque;
- avaliações de clientes;
- agendas com datas e horários;
- reservas iniciais para demonstrar o painel.

## Persistência local

O app salva o estado no navegador usando `localStorage`.

### Chave usada

- `vaidebrinks-state`

### O que é persistido

- rascunho da reserva;
- lista de reservas atuais.

## Utilitários de apoio

O arquivo `lib/utils.ts` concentra funções importantes:

- `formatCurrency()` — formata valores em BRL.
- `formatDateLabel()` — formata datas de exibição curta.
- `formatLongDate()` — formata datas por extenso.
- `makeBookingId()` — gera IDs de reserva.
- `makeSlug()` — cria slugs amigáveis.
- `cn()` — combina classes CSS.

## Observação sobre consistência

O formulário e os seeds iniciais já estão alinhados com a localização em português do Brasil, inclusive para `eventType`.
