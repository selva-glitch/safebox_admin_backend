
// src/decorators/validate-context.decorator.ts
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ValidationErrorDetail } from '../interfaces/common.interface'


export class CommonController {


    protected getInput(data: any) {
        return data
    }


    protected formatResponse(data: any) {
        return data
    }

    protected validationErrorResponse(error: any) {
       return {status: false,message: 'Validation Error',error}
    }

    protected errorResponse(error: any) {
       return {status: false,message: 'Internal server error',error}
    }

     protected successResponse(message: string, data: any) {
       return {status: false,message: message,data}
    }


    protected requestValidation<T extends object>(
        dto: new () => T,
        method: string,
        data: unknown
    ): [T, ValidationErrorDetail[] | null, boolean] {
        const instance = plainToInstance(dto, data);
        const errors = validateSync(instance);

        let isError = false;
        let formatted : ValidationErrorDetail[] = [];

        if (errors.length > 0) {
            isError = true;
            formatted = errors.map((err) => ({
                field: err.property,
                errors: Object.values(err.constraints || {}),
            }));
        }

        return [instance, formatted, isError];
    }
    



}   