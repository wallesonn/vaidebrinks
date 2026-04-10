# Deploy com Docker

Este projeto foi preparado para deploy em VPS com **Traefik**, **Portainer**, **Postgres** e **Redis**.

## Artefatos disponíveis

- `Dockerfile` na raiz do projeto.
- `build.sh` para publicar a imagem no Docker Hub.
- `vaidebrinks-docker/docker-compose.yml` para subir a stack no Portainer.

## Imagem Docker Hub

A imagem publicada atualmente usa o repositório:

- `wallesonnn/vai-de-brinks:v1.0.0`
- `wallesonnn/vai-de-brinks:latest`

## Variáveis de ambiente para o Portainer

```env
APP_DOMAIN=vaidebrinks.online
APP_IMAGE=wallesonnn/vai-de-brinks:v1.0.0

POSTGRES_DB=vaidebrinks
POSTGRES_USER=vaidebrinks
POSTGRES_PASSWORD=coloque-uma-senha-forte

TRAEFIK_NETWORK=web
TRAEFIK_ENTRYPOINT=websecure
TRAEFIK_CERTRESOLVER=lets-encrypt
```

## Como o stack funciona

- O serviço `app` consome a imagem do Docker Hub.
- O app fica apenas na rede interna e na rede externa `web` do Traefik.
- O Postgres e o Redis ficam isolados na rede interna.
- Nenhuma porta do app é exposta diretamente no host.
- O acesso público acontece via `https://vaidebrinks.online` pelo Traefik.

## Build e publicação da imagem

```bash
chmod +x build.sh
./build.sh v1.0.0
```

O script publica:

- `wallesonnn/vai-de-brinks:v1.0.0`
- `wallesonnn/vai-de-brinks:latest`

## Dependências da infraestrutura

A stack espera uma infraestrutura com:

- rede Docker externa `web`;
- Traefik com entrypoint `websecure`;
- cert resolver `lets-encrypt`;
- DNS de `vaidebrinks.online` apontando para a VPS.

## Observação

A aplicação não usa banco ou cache de forma ativa no frontend atual, mas os serviços já estão preparados para futuras integrações.
