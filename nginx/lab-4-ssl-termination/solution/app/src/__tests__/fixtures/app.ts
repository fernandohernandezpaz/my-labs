import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '@/app.module';

export function createTestingModule(): TestingModuleBuilder {
  return Test.createTestingModule({
    imports: [AppModule],
  });
}

export async function createAppFrom(
  testingModule: TestingModuleBuilder,
): Promise<INestApplication> {
  const module = await testingModule.compile();
  const app = module.createNestApplication({
    logger: ['error', 'warn'],
  });
  await app.init();
  return app;
}
