#!/bin/bash

# Script to stop the morphic-stack services
# This handles both old and new Docker Compose syntax

echo "Stopping morphic-stack services..."

# Check if docker compose (new syntax) is available
if command -v docker &> /dev/null && docker compose version &> /dev/null; then
    echo "Using 'docker compose' (new syntax)"
    docker compose down
elif command -v docker-compose &> /dev/null; then
    echo "Using 'docker-compose' (legacy syntax)"
    docker-compose down
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' command found."
    echo "Please install Docker and Docker Compose:"
    echo "- For Docker Desktop: https://www.docker.com/products/docker-desktop"
    echo "- For Docker Engine + Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "Services stopped successfully!"