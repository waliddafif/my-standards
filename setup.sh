#!/bin/bash
set -e

REPO_URL="git@github.com:waliddafif/my-standards.git"
INSTALL_DIR="$HOME/Documents/my-standards"
CLAUDE_DIR="$HOME/.claude"
SYMLINK="$CLAUDE_DIR/CLAUDE.md"

echo "=== my-standards setup ==="

# 1. Cloner si pas déjà présent
if [ -d "$INSTALL_DIR/.git" ]; then
  echo "✓ Repo déjà présent, mise à jour..."
  git -C "$INSTALL_DIR" pull --ff-only
else
  echo "→ Clonage dans $INSTALL_DIR..."
  git clone "$REPO_URL" "$INSTALL_DIR"
fi

# 2. Créer ~/.claude/ si nécessaire
mkdir -p "$CLAUDE_DIR"

# 3. Backup si un vrai fichier existe déjà (pas un symlink)
if [ -f "$SYMLINK" ] && [ ! -L "$SYMLINK" ]; then
  BACKUP="$SYMLINK.backup.$(date +%Y%m%d_%H%M%S)"
  echo "→ Backup de l'existant : $BACKUP"
  mv "$SYMLINK" "$BACKUP"
fi

# 4. Créer le symlink
ln -sf "$INSTALL_DIR/CLAUDE.md" "$SYMLINK"
echo "✓ Symlink créé : $SYMLINK → $INSTALL_DIR/CLAUDE.md"

echo ""
echo "=== Terminé ==="
echo "Les règles globales sont maintenant actives dans tous tes projets Claude Code."
