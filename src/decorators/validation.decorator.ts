// src/decorators/validate-context.decorator.ts
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function ValidateContext(dtoClass: any) {
  return createParamDecorator((_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const rawBody = request.context?.body;

    const instance = plainToInstance(dtoClass, rawBody);
    const errors = validateSync(instance);

    if (errors.length > 0) {
      const formatted = errors.map((err) => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));
      throw new BadRequestException({
        status: false,
        message: 'Validation failed',
        details: formatted,
      });
    }

    request.context.validatedBody = instance;
    return instance;
  })();
}
