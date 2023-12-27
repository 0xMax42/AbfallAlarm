const path = require('path');

module.exports = {
    mode: 'development', // oder 'production' für Produktionsbuilds
    entry: path.resolve(__dirname, 'src', 'main.ts'), // Ihr Einstiegspunkt, üblicherweise main.ts
    devtool: 'source-map', // Source Maps für das Debugging
    module: {
        rules: [
            {
                test: /\.ts$/, // Regel für TypeScript-Dateien
                use: 'ts-loader', // Verwendung des ts-loaders
                exclude: /node_modules/, // node_modules ausschließen
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'], // Erlaubt das Importieren von .ts und .js Dateien
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Output-Verzeichnis
        filename: 'bundle.js', // Output-Dateiname
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Statischer Inhalt aus dem public-Verzeichnis
        },
        compress: true, // Komprimierung für kleinere Dateien
        port: 8080, // Port für den Entwicklungsserver
    },
};
