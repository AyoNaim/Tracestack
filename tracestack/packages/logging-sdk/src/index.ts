interface LogMetaData {
    [key: string]: any
}

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL'

export interface LogEntry {
    message: string;
    level: LogLevel;
    projectId: string;
    meta?: LogMetaData
}

export class TracestackLogger {
  private apiUrl!: string;
  private projectId!: string;
  public isInitialized: boolean = false;
  
  constructor () {};
  
  public init(apiUrl: string, projectId: string): void {
    if (this.isInitialized) {
        console.warn('TracestackLogger already initialized. Skipping re-initialization.');
        return;
    };

    if (!apiUrl || !projectId) {
        console.error('TracestackLogger: API URL and Project ID are required for initialization.');
        return;
    };

    this.apiUrl = apiUrl;
    this.projectId = projectId;
    this.isInitialized = true;
  };

  private async sendLog(log: Omit<LogEntry, 'projectId'>): Promise<void> {
    if (!this.isInitialized) {
      console.error('TracestackLogger not initialized. Call .init() first.');
      return;
    };

    try {
        const fullLog: LogEntry = { ...log, projectId: this.projectId };
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fullLog)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`TracestackLogger: Failed to send log (${response.status} ${response.statusText}):`, errorText);
            console.log(`TracestackLogger: Failed to send log (${response.status} ${response.statusText}):`, errorText);
        }
    } catch (error) {
        console.error('TracestackLogger: Error sending log to API:', error);
    }
  };

  debug(message: string, meta?: LogMetaData): void {
    this.sendLog({message, level: 'DEBUG', meta})
  };

  info(message: string, meta?: LogMetaData): void {
    this.sendLog({message, level: 'INFO', meta})
  };

  warn(message: string, meta?: LogMetaData): void {
    this.sendLog({message, level: 'WARN', meta})
  };

  error(message: string, meta?: LogMetaData): void {
    this.sendLog({message, level: 'ERROR', meta})
  };

  critical(message: string, meta?: LogMetaData): void {
    this.sendLog({message, level: 'CRITICAL', meta})
  };
}

export const logger = new TracestackLogger();