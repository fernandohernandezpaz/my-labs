import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
// import { PdfService } from './pdf.service';

@Controller()
export class PdfController {
  // constructor(private readonly pdfService: PdfService) {}
  @MessagePattern({ cmd: 'generate_pdf' })
  geerate(@Payload() data: { html: string }): string {
    console.log(`Generating PDF for content: ${data.html}`);
    return `pdf_generated_${Date.now()}.pdf`;
  }
}
