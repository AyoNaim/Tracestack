import { Queue, QueueOptions, ConnectionOptions } from 'bullmq';

const redisConnection: ConnectionOptions = {
    host: 'redis-12816.c14.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 12816,
    username: 'default',
    password: 'efDQsKCLxEEnDcakr1eqcGPZI23zPdLq'
}

const queueConnection: QueueOptions = {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        },
        removeOnComplete: true,
        removeOnFail: false
    }
}

export const logQueue = new Queue('logQueue', queueConnection);