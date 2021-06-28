import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber Token
  const authToken = request.headers.authorization;

  // Validar se token esta preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar se token é válido
    const { sub } = verify(
      token,
      "69eab3139e130113a172dfddbb059923"
    ) as IPayload;

    // Recuperar informacao de usuarion
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }




}