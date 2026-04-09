#!/bin/bash
# Build e push da imagem Vai de Brinks para o Docker Hub
# Uso: ./build.sh v1.0.0
set -euo pipefail

DOCKERHUB_USERNAME="wallesonnn"
DOCKERHUB_REPOSITORY="vai-de-brinks"
VERSION=${1:-v1.0.0}

IMAGE_NAME="$DOCKERHUB_USERNAME/$DOCKERHUB_REPOSITORY"

echo "🔨 Building: $IMAGE_NAME:$VERSION (linux/amd64)"
docker buildx build --platform linux/amd64 --no-cache \
  -t "$IMAGE_NAME:$VERSION" \
  -t "$IMAGE_NAME:latest" \
  --push \
  .

echo "✅ Done! Image published: $IMAGE_NAME:$VERSION and $IMAGE_NAME:latest"
