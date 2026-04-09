# Visão geral

O **Vai de Brinks** é um protótipo de plataforma de aluguel e reserva de brinquedos para festas infantis.

A experiência foi pensada como um SaaS visual e divertido, com foco em:

- Descoberta rápida de brinquedos para festa.
- Reserva com seleção de data e horário.
- Simulação de pagamento e confirmação.
- Acompanhamento de reservas em uma área dedicada.
- Interface totalmente localizada para português do Brasil.

## O que o produto entrega hoje

- Página inicial com destaque para fornecedores, brinquedos populares e navegação para busca.
- Página de busca com filtros por texto, data, categoria e faixa de preço.
- Página de detalhes do brinquedo com galeria, fornecedor, avaliações e seletor de disponibilidade.
- Etapa de reserva com formulário de festa e resumo do pedido.
- Etapa de pagamento simulada com formulário de cartão fictício.
- Página de confirmação com ID da reserva e próximos passos.
- Página de reservas para listar, filtrar e cancelar reservas.
- Página 404 personalizada.

## Público-alvo simulado

A interface conversa com pais, responsáveis e organizadores de festas que querem comparar opções rapidamente e reservar uma atração sem sair do fluxo.

## Estado atual do projeto

- O app está funcional como **frontend standalone**.
- Os dados são mockados localmente.
- As reservas são persistidas no navegador via `localStorage`.
- O estilo visual usa uma identidade alegre, pastel e amigável para festas infantis.

## Limitações conhecidas

- Sem autenticação.
- Sem backend.
- Sem integração com estoque ou calendário real.
- Sem cobrança real.
