#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');

if (!fs.existsSync(nodeModulesPath)) {
  console.log('node_modules n\'existe pas encore');
  process.exit(0);
}

console.log('Correction des permissions de node_modules...');

try {
  // Essayer de corriger les permissions sans sudo
  execSync(`chmod -R u+rwX "${nodeModulesPath}"`, { stdio: 'inherit' });
  console.log('✅ Permissions corrigées');
} catch (error) {
  console.log('⚠️  Certaines permissions nécessitent sudo, mais le site devrait fonctionner');
}

// Nettoyer les attributs étendus macOS si possible
try {
  execSync(`xattr -rc "${nodeModulesPath}" 2>/dev/null || true`, { stdio: 'inherit' });
  console.log('✅ Attributs étendus nettoyés');
} catch (error) {
  // Ignorer les erreurs
}

console.log('Terminé !');


