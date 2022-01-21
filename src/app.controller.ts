import { Controller, Get, Request } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  getHealth(@Request() req) {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'docs',
          `${req.protocol}://${req.get('host')}/docs`,
        ),
      () => this.db.pingCheck('database'),
    ]);
  }
}
