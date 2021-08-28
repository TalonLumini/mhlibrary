export class Logger {
    append: string;

    constructor() {
        this.append = `[${new Date().toISOString()}] `;
    }

    info(...data: any) {
        console.info(`${this.append}[INFO] ${data.toString()}`);
    }

    log(...data: any) {
        console.log(`${this.append}[LOG] ${data.toString()}`);
    }

    error(...data: any) {
        console.error(`${this.append}[ERROR] ${data.toString()}`);
    }

    warn(...data: any) {
        console.warn(`${this.append}[WARN] ${data.toString()}`);
    }
}