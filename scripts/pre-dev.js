#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Vérification et correction automatique...');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const nextPath = path.join(nodeModulesPath, 'next');

// Vérifier si node_modules existe
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules n\'existe pas. Exécutez: npm install');
  process.exit(1);
}

// Vérifier si le fichier problématique existe et est lisible
const problematicFile = path.join(nextPath, 'dist/client/components/router-reducer/create-href-from-url.js');

if (fs.existsSync(problematicFile)) {
  try {
    fs.accessSync(problematicFile, fs.constants.R_OK);
    console.log('✅ Tous les fichiers sont accessibles');
  } catch (error) {
    console.log('🔧 Correction des permissions...');
    try {
      execSync(`chmod -R u+rwX "${nodeModulesPath}"`, { stdio: 'pipe' });
      execSync(`xattr -rc "${nodeModulesPath}" 2>/dev/null || true`, { stdio: 'pipe' });
      console.log('✅ Permissions corrigées');
    } catch (fixError) {
      console.log('⚠️  Certaines corrections nécessitent des privilèges élevés');
    }
  }
}

// Ne plus nettoyer automatiquement le cache - laisser Next.js gérer
// Le hot reload fonctionne mieux avec le cache

console.log('✅ Prêt à démarrer !\n');

