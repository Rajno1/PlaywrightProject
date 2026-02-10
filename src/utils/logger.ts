/**
 * Custom Logger Utility
 * Provides structured logging for test execution
 */

export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${level}] ${timestamp} - ${message}`;
  }

  static info(message: string): void {
    console.log(this.formatMessage('INFO', message));
  }

  static error(message: string, error?: any): void {
    console.error(this.formatMessage('ERROR', message));
    if (error) {
      console.error('Error details:', error);
    }
  }

  static warn(message: string): void {
    console.warn(this.formatMessage('WARN', message));
  }

  static debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.log(this.formatMessage('DEBUG', message));
    }
  }

  static step(stepName: string): void {
    console.log(this.formatMessage('STEP', `Executing: ${stepName}`));
  }

  static success(message: string): void {
    console.log(this.formatMessage('SUCCESS', `✓ ${message}`));
  }

  static separator(): void {
    console.log('='.repeat(80));
  }

  static testStart(testName: string): void {
    this.separator();
    this.info(`Starting Test: ${testName}`);
    this.separator();
  }

  static testEnd(testName: string): void {
    this.separator();
    this.success(`Test Completed: ${testName}`);
    this.separator();
  }
}
