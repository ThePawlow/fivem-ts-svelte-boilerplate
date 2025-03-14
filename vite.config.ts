import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                server: './src/server/startup.ts',
                client: './src/client/startup.ts',
            },
            output: {
                dir: './dist',
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
