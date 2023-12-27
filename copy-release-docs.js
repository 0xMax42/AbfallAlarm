//copy-release-docs.js
// Zweck: Kopiert die Dateien aus dem Ordner "public" in den Ordner "docs" und die Datei "dist/bundle.js" in den Ordner "docs/bundle.js"
const copy = require('fs-extra').copy;

// Funktion zum Kopieren von Dateien
async function copyFiles() {
    try {
        await copy('public', 'docs');
        await copy('dist/bundle.js', 'docs/bundle.js');
        console.log('Dateien erfolgreich kopiert.');
    } catch (error) {
        console.error('Fehler beim Kopieren der Dateien:', error);
    }
}

// Kopiervorgang starten
copyFiles();
