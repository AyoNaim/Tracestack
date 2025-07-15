import { Worker, Job, ConnectionOptions, RedisConnection } from 'bullmq';
import { prisma } from '@tracestack/db';

const redisConnection: ConnectionOptions = {
    host: 'redis-12816.c14.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 12816,
    username: 'default',
    password: 'efDQsKCLxEEnDcakr1eqcGPZI23zPdLq',
}

async function processLogJob(job: Job<any, any, string>) {
  console.log(`Processing log job ${job.id}: ${job.name} with data:`, job.data);

  const { message, level, meta, projectId } = job.data;

  try {
    if (!message || !level || !projectId) {
      throw new Error('Invalid log job data: missing message, level, or projectId');
    }

    const savedLog = await prisma.log.create({
      data: {
        message: message,
        level: level,
        meta: meta || {},
        projectId: projectId,
      },
    });

    console.log(`Log job ${job.id} processed successfully. Log ID: ${savedLog.id}`);
    return savedLog.id;
  } catch (error: any) {
    console.error(`Error processing job ${job.id}:`, error.message);
    // IMPORTANT: Re-throw the error so BullMQ marks the job as failed and retries it
    throw error;
  }
}

export const logWorker = new Worker(
  'logQueue', // Must match the queue name exactly
  processLogJob, // The function that processes jobs
  {
    connection: redisConnection,
    concurrency: 5, // Process up to 5 jobs concurrently
    // For more robust error handling and graceful shutdown, consider:
    // drainDelay: 50, // Delay before worker exits on drain
    // lockDuration: 30000, // Extend lock duration for long-running jobs (default 30s)
  }
);

// Optional: Listen for worker events for more detailed monitoring
logWorker.on('active', (job) => {
  console.log(`Worker: Job ${job.id} is now active.`);
});

logWorker.on('completed', (job, result) => {
  console.log(`Worker: Job ${job.id} completed successfully. Result: ${result}`);
});

logWorker.on('failed', (job, error) => {
  if (job) {
    console.error(`Worker: Job ${job.id} failed with error: ${error.message}`);
  } else {
    console.log('unknown error detected', error.message)
  }
});

logWorker.on('error', (err) => {
  console.error('Worker Error:', err);
});

console.log('Log Worker initialized.');