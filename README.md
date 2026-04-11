# Vai de Brinks

O **Vai de Brinks** é um SaaS frontend para aluguel e reserva de brinquedos de festa infantil.

## Stack atual

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Docker / Docker Compose
- Traefik na VPS
- Postgres e Redis preparados na stack

## Documentação

- [Visão geral](./docs/visao-geral.md)
- [Arquitetura](./docs/arquitetura.md)
- [Fluxos do produto](./docs/fluxos.md)
- [Modelo de dados](./docs/modelo-de-dados.md)
- [Localização pt-BR](./docs/localizacao.md)
- [Próximos passos](./docs/proximos-passos.md)

## Deploy

Veja as instruções de containerização e publicação no Docker Hub na pasta `vaidebrinks-docker` e no arquivo `build.sh`.

## Produção

- A stack de produção usa o diretório `vaidebrinks-docker/`.
- O domínio padrão configurado no Traefik é `vaidebrinks.fun`.
- Para trocar o domínio, atualize `APP_DOMAIN` no Portainer e faça o redeploy da stack.
- Se o navegador mostrar erro de certificado, verifique se o DNS do domínio aponta para a VPS e se o Traefik conseguiu emitir o certificado Let\'s Encrypt.

Consulte também `docs/deploy-docker.md` para as variáveis de ambiente e os passos completos de atualização.
