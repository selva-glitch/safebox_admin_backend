// src/decorators/validate-context.decorator.ts
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { 
    ValidationErrorDetailType,
    successResponseType,
    errorResponseType,
    validationErrorResponseType 
} from '../interfaces/common.interface'

/**
 * CommonController
 * 
 * A base controller providing reusable helper methods for:
 * - Input extraction
 * - Standardized response formatting
 * - Request validation using DTOs
 * 
 * Other controllers can extend this class to avoid repetitive code.
 */
export class CommonController {

    /**
     * Extract and return request input data (can be extended if needed)
     * 
     * @param data - Raw request input
     * @returns {any} Same data (placeholder for transformations)
     */
    protected getInput(data: any) {
        return data;
    }

    /**
     * Wraps data into a consistent response format.
     * Currently returns data as-is, but useful for global formatting.
     * 
     * @param data - Any response object
     * @returns {any} Formatted response object
     */
    protected formatResponse(data: any) {
        return data;
    }

    /**
     * Generates a validation error response object.
     * 
     * @param error - Validation errors
     * @returns {validationErrorResponseType} Standardized error response
     */
    protected validationErrorResponse(error: any): validationErrorResponseType {
        return { status: false, message: 'Validation Error', error };
    }

    /**
     * Generates a generic internal server error response object.
     * 
     * @param error - Error details (e.g., stack trace)
     * @returns {errorResponseType} Standardized server error response
     */
    protected errorResponse(error: any): errorResponseType {
        return { status: false, message: 'Internal server error', error };
    }

    /**
     * Generates a success response object.
     * 
     * @param message - Success message
     * @param data - Actual data returned from service
     * @returns {successResponseType} Standardized success response
     */
    protected successResponse(message: string, data: any): successResponseType {
        if (data.status) {
            return { 
                status: true, 
                message, 
                data: data.data, 
                error: data.error ?? false 
            };
        }
        return { 
            status: false, 
            message, 
            data: [], 
            error: data.error ?? false 
        };
    }

    /**
     * Validates request data against a DTO schema using class-validator.
     * 
     * @template T DTO class type
     * @param dto - DTO class for validation
     * @param method - HTTP method (not actively used but can be leveraged)
     * @param data - Incoming request data
     * @returns {[T, ValidationErrorDetailType[] | null, boolean]} 
     *  - Validated DTO instance
     *  - Validation errors (if any)
     *  - isError flag (true if validation failed)
     */
    protected requestValidation<T extends object>(
        dto: new () => T,
        method: string,
        data: unknown
    ): [T, ValidationErrorDetailType[] | null, boolean] {
        // Transform plain JS object into DTO instance
        const instance = plainToInstance(dto, data);

        // Validate DTO using class-validator
        const errors = validateSync(instance);

        let isError = false;
        let formatted: ValidationErrorDetailType[] = [];

        // If validation fails, map errors into a consistent structure
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
