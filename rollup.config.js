import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';


const config = [
    {
        input: './src/Nightrun.js',
        output: {
            file: 'dist/nightrun.js',
            format: 'es',
            name: 'nightrun',
            globals: {}
        },
        external: [
            'phaser'
        ],
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: 'src'
                }
            }),
            buble()
        ]
    }
];

export default config;