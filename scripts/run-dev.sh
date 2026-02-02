#!/bin/sh
# Lance le serveur de développement avec une limite de fichiers plus haute
# pour éviter les erreurs "EMFILE: too many open files" et permettre le hot reload.
cd "$(dirname "$0")/.."
ulimit -n 10240 2>/dev/null || true
exec npx next dev -p 3001
