import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                server: './src/core/server/startup.ts',
                client: './src/core/client/startup.ts',
            },
            output: {
                dir: './resources/[local]/core',
                entryFileNames: '[name].js',
                format: 'cjs',
            },
            external: [
                'fs',
                'path',
                '@prisma/client',
                'napi',
            ],
        },
        target: 'node22',
    },
    ssr: {
        noExternal: ['@prisma/client'],
    },
});