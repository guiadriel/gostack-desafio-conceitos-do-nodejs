import { isUuid } from 'uuidv4';
import { Request, Response, NextFunction } from 'express';

export default function validateUuid(request: Request, response: Response, next: NextFunction){
  const { id } = request.params;

  if ( !isUuid( id ) ) {
    return response.status(400).json({
      message: 'Invalid ID.'
    });
  }

  return next();
}