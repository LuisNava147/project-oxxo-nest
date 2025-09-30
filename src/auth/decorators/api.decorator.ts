import { applyDecorators } from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional, ApiResponse} from '@nestjs/swagger';

export const ApiAuth=(()=>{
    return applyDecorators(
    ApiResponse({
        status:401,//error por falta el token
        description:'Missing or invalid Token'
      }),
    ApiResponse({
        status:403,//rol no adecuado 
        description:'Missing Rol'
      }),
    ApiResponse({
        status:500,//error de server
        description:"Server error"
      }),
      )
})

 