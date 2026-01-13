import { Module } from '@nestjs/common';
import { PaymentPromiseService } from './payment_promise.service';
import { PaymentPromiseController } from './payment_promise.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentPromiseController],
  providers: [PaymentPromiseService],
})
export class PaymentPromiseModule {}
