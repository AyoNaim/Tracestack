import { logQueue } from "lib/queues/logQueue";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log('*** API/LOGS: Request received! ***');
    const logData = await req.json();
    console.log('*** API/LOGS: JSON parsed, data:', logData);
    try {
        if (!logData.message || !logData.level || !logData.projectId) {
            console.log('*** API/LOGS: Missing required fields, returning 400');
            return NextResponse.json({ error: 'Log message, level, and projectId are required' }, { status: 400 })
        };

        console.log('*** API/LOGS: Data valid, adding to queue');
        const job = await logQueue.add('log-processing-job', logData);
        console.log(`Log job added to queue with ID: ${job.id}`);
        return NextResponse.json(
        { success: true, message: 'Log accepted for processing', jobId: job.id },
        { status: 202 }
        );
    } catch (error: any) {
        console.error('error in api/logs:', error);
        return NextResponse.json(
            { error: 'Failed to accept log', details: error.message || 'Unknown error' },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const stats = await logQueue.getMetrics('completed');
        return NextResponse.json({
            status: 'queue operational',
            completedJobs: stats.count
        })
    } catch (error: any) {
        console.error("Queue health check failed:", error);
        return NextResponse.json({ status: "Queue not operational", error: error.message }, { status: 500 });
    }
}