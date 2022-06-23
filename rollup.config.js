import { join } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser'; // js压缩
import typescript from 'rollup-plugin-typescript2';
// import visualizer from 'rollup-plugin-visualizer';
import vue from 'rollup-plugin-vue';
import postcssConvert from 'postcss-px-to-viewport';

// eslint-disable-next-line import/no-dynamic-require
const PKG_JSON = require(join(__dirname, 'package.json'));

const convetConfig = {
    unitToConvert: 'px',
    viewportWidth: 414,
    unitPrecision: 5,
    viewportUnit: 'vw',
    selectorBlackList: ['no-convert'],
    minPixelValue: 1,
    mediaQuery: true,
};

export default commandLineArgs => {
    // 清理多余的参数
    delete commandLineArgs.t;

    return {
        input: 'src/index.ts',
        output: [
            {
                format: 'es',
                name: 'vue-h5-components',
                // sourcemap: true,
                dir: 'dist/esm',
                preserveModules: true,
                globals: {
                    vue: 'vue',
                },
            },
            {
                file: 'dist/cjs/index.js',
                format: 'cjs',
                name: 'vue-h5-components',
                // sourcemap: true,
                globals: {
                    vue: 'vue',
                },
            },
        ],
        external: id => {
            // https://rollupjs.org/guide/en/#peer-dependencies
            const arr = [...Object.keys(PKG_JSON.peerDependencies || {})];
            // https://github.com/rollup/rollup/issues/3743
            return arr.includes(id) || id.includes('lodash') || id === 'tslib' || id.startsWith('vue');
        },
        plugins: [
            resolve({ browser: true, extensions: ['.vue'] }),
            commonjs(),
            typescript({
                clean: true,
                tsconfig: 'tsconfig.json',
                rollupCommonJSResolveHack: false,
            }),
            
            vue({ 
                needMap: false,
                // https://rollup-plugin-vue.vuejs.org/options.html#style
                style: {
                    postcssPlugins: [
                        postcssConvert(convetConfig),
                    ],
                },
            }),
            
            terser(),
            // visualizer(),
        ],
    };
};
