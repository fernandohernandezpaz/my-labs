import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('PDF_SERVICE') private client: ClientProxy) { }
  getHello(): string {
    return 'Hello World!';
  }

  async generatePdf(html: string): Promise<any> {
    const pattern = { cmd: 'generate_pdf' };
    const payload = { html };
    return firstValueFrom(this.client.send(pattern, payload));
  }
}
