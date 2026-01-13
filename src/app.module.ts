import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentPromiseModule } from './payment_promise/payment_promise.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
    CustomerModule,
    PaymentPromiseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
