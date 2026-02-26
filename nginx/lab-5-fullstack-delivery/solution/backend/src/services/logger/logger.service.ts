import {
  Injectable,
  Scope,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import { GlobalConfigsService } from '@/configs/global-configs.service';
import { PrintFormatInfo } from './type/print-format-info.type';
import { clcColors as clc } from './constants/clc-colors.constant';
import { nestColorsSchema } from './schema/nest-colors.schema';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  private readonly rootLogger: Logger;
  private context?: string;

  constructor(private readonly globalConfigsService: GlobalConfigsService) {
    this.rootLogger = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({
              format: 'DD/MM/YYYY, HH:mm:ss A',
            }),
            format.ms(),
            format.printf((info) => this.printFormat(info as PrintFormatInfo)),
          ),
        }),
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, metadata?: Record<string, unknown>) {
    const caller = this.getCaller(this.log.name);
    this.logger.info(message, { caller, context: this.context, ...metadata });
  }

  error(message: Error): void;
  error(
    message: string,
    error?: Error,
    metadata?: Record<string, unknown>,
  ): void;

  error(
    message: string | Error,
    error?: Error,
    metadata?: Record<string, unknown>,
  ) {
    const caller = this.getCaller(this.error.name);

    if (message instanceof Error) {
      this.logger.error(message.message, {
        caller,
        context: this.context,
        error: message,
        ...metadata,
      });
      return;
    }

    this.logger.error(message, {
      caller,
      context: this.context,
      error,
      ...metadata,
    });
  }

  warn(message: string, metadata?: Record<string, unknown>) {
    const caller = this.getCaller(this.warn.name);
    this.logger.warn(message, { caller, context: this.context, ...metadata });
  }

  debug(message: string, metadata?: Record<string, unknown>) {
    const caller = this.getCaller(this.debug.name);
    this.logger.debug(message, { caller, context: this.context, ...metadata });
  }

  verbose(message: string, metadata?: Record<string, unknown>) {
    const caller = this.getCaller(this.verbose.name);
    this.logger.verbose(message, {
      caller,
      context: this.context,
      ...metadata,
    });
  }

  private get logger(): Logger {
    const globalConfig = this.globalConfigsService.getGlobalConfig();

    return this.rootLogger.child({
      appName: globalConfig.appName,
    });
  }

  private printFormat({
    appName = '',
    caller,
    context,
    correlationId,
    level,
    message,
    ms,
    timestamp,
    error,
    ...metadata
  }: PrintFormatInfo): string {
    const color = nestColorsSchema[level] || ((text: string): string => text);
    const yellow = clc.yellow;

    const base = [
      appName ? `${color(`[${appName}]`)} ` : '',

      `${color(String(process.pid)).padEnd(6)} `,

      color(' - '),

      'undefined' === typeof timestamp ? '' : `${timestamp} `,

      `${color(level.toUpperCase().padStart(7))} `,

      'undefined' === typeof context ? '' : `${yellow(`[${context}]`)}`,

      'undefined' === typeof caller ? '' : `${yellow(`[${caller}]`)}` + ' ',

      'undefined' === typeof correlationId
        ? ''
        : `${color(`[${correlationId}]`)}`,
      'undefined' === typeof message ? '' : ` ${color(message)}`,
    ].join('');

    const parts: string[] = ['undefined' === typeof ms ? '' : ` ${yellow(ms)}`];

    if ('undefined' !== typeof error) {
      parts.push(
        typeof error === 'string'
          ? ` ${error}`
          : ` ${color(error.stack ?? '')}`,
      );
    }
    if (metadata && Object.keys(metadata).length > 0) {
      parts.push(clc.cyanBright(JSON.stringify(metadata)));
    }

    return base + parts.join(' | ');
  }

  private getCaller(name: string) {
    if (!this.context) {
      return undefined;
    }

    try {
      const stack = new Error().stack;

      if (!stack) {
        return undefined;
      }

      const stackList = stack.split('\n');

      const loggerServiceIndex = stackList.findIndex((s) =>
        s.includes(`at LoggerService.${name}`),
      );

      const caller = stackList[loggerServiceIndex + 1];
      const callerRegex = /at [\w.]+\.(\w+)/;

      const match = caller.match(callerRegex);
      if (match) {
        return match[1];
      }

      return caller.match(/at (\w+)/)?.[1];
    } catch (err: unknown) {
      this.logger.error(err);
      return undefined;
    }
  }
}
