import { logWorker } from './lib/queues/logWorker';

// logWorker.run();

console.log('Worker process started. Waiting for jobs...');

process.on('SIGINT', async () => {
    console.log('Worker: SIGINT received. Shutting down gracefully...');
    await logWorker.close();
    process.exit(0)
});

process.on('SIGTERM', async () => {
    console.log('Worker: SIGTERM received. Shutting down gracefully...');
    await logWorker.close();
    process.exit(0)
})