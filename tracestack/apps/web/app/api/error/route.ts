import { logger } from "@tracestack/logging-sdk";
import { NextRequest, NextResponse } from "next/server";

const apiUrl = 'http://localhost:3000/api/logs';
const projectId = 'cmcxotz2a0000c89xlhdwhatv';

if (!logger.isInitialized) {
    logger.init(apiUrl, projectId)
};

export async function GET(req:NextRequest) {
    try {
        if (Math.random() > 0.5) {
            throw new Error("'Random backend processing error!'");
        };
        logger.info('Backend GET request processed successfully.');
        return NextResponse.json({ message: 'Backend operation successful!' });
    } catch (error) {
        console.log('an error has occurred')
        logger.error('Backend operation failed!', {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            route: '/api/error',
        });
        return NextResponse.json({ message: 'Backend operation failed.'}, { status: 500 });
    };
}

// Batching/Debouncing (Advanced): For high-volume logging, 
// you might want to extend your SDK to batch logs
// and send them in chunks every few seconds instead of sending each log individually. 
// This reduces network overhead. Libraries like lodash.debounce or p-debounce could help, 
// or a more sophisticated queue within the SDK itself.