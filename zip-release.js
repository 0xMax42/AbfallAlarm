const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

const outputFileName = `${packageJson.displayName}_v${packageJson.version}.zip`;
const outputFilePath = path.join(__dirname, 'release', outputFileName);
const sourceDirPath = path.join(__dirname, 'docs');

// Stellen Sie sicher, dass das Release-Verzeichnis existiert
if (!fs.existsSync(path.join(__dirname, 'release'))) {
    fs.mkdirSync(path.join(__dirname, 'release'));
}

// Erstellen des ZIP-Archivs
const output = fs.createWriteStream(outputFilePath);
const archive = archiver('zip', {
    zlib: { level: 9 } // Maximaler Kompressionsgrad
});

output.on('close', function () {
    console.log(`Archiv ${outputFileName} erstellt: ${archive.pointer()} Bytes`);
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);
archive.directory(sourceDirPath, false);
archive.finalize();
