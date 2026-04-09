# Fluxos do produto

## 1. Descoberta de brinquedos

O fluxo começa na página inicial e na busca.

### Etapas

- O usuário vê a vitrine inicial com brinquedos em destaque.
- Pode acessar a busca para filtrar por texto, data, categoria e preço.
- A lista reflete a disponibilidade simulada dos brinquedos.

### Regras de interface

- Os estados de disponibilidade aparecem como:
  - disponível;
  - com poucas vagas;
  - esgotado.
- O catálogo exibe informações como avaliação, capacidade e localidade.

## 2. Detalhes do brinquedo

Na página de detalhes, o usuário encontra:

- galeria visual;
- descrição do brinquedo;
- fornecedor;
- avaliações;
- seletor de data e horário;
- chamada para reserva.

### Regra principal

Somente horários disponíveis podem seguir para a reserva.

## 3. Reserva da festa

Na tela de reserva, o usuário informa dados como:

- nome da criança;
- idade;
- endereço;
- tipo de evento;
- quantidade de crianças;
- observações.

Depois disso, o usuário avança para o pagamento.

## 4. Pagamento simulado

Essa etapa não integra um gateway real.

### O que acontece

- o formulário aceita dados fictícios;
- o app gera uma reserva confirmada no estado local;
- o usuário é levado para a tela de confirmação.

## 5. Confirmação

A página de confirmação exibe:

- ID da reserva;
- brinquedo reservado;
- data e horário;
- fornecedor;
- endereço;
- próximos passos.

## 6. Minhas reservas

A área de reservas permite:

- visualizar reservas por status;
- filtrar por confirmadas, pendentes ou canceladas;
- cancelar reservas confirmadas.

## 7. Estados vazios e erro

O app usa `EmptyState` para orientar o usuário quando:

- nenhum brinquedo foi selecionado;
- a reserva ainda não existe;
- o item procurado não foi encontrado.

## 8. Regras de navegação

- O fluxo ideal é: início -> busca -> detalhes -> reserva -> pagamento -> confirmação.
- O usuário pode voltar a qualquer momento para ajustar data, horário ou brinquedo.
- O cancelamento é um comportamento de mock para demonstrar atualização de status.
