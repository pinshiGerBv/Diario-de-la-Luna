import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import type { Response } from 'express';

import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('stream')
  async streamResponse(@Body('prompt') prompt: string, @Res() res: Response) {
    // IMPRIMIR PROMPT
    console.log('[BACKEND] Prompt recibido:', prompt);

    if (!prompt || typeof prompt !== 'string') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'El parámetro prompt es obligatorio.',
      });
    }

    res.setHeader('Content-Type', 'text/event-stream');

    res.setHeader('Cache-Control', 'no-cache, no-transform');

    res.setHeader('Connection', 'keep-alive');

    res.flushHeaders();

    try {
      await this.aiService.streamResponse(prompt, (chunk: string) => {
        res.write(
          `data: ${JSON.stringify({
            text: chunk,
          })}\n\n`,
        );
      });

      res.write(`data: [DONE]\n\n`);
    } catch (error) {
      console.error(error);

      res.write(
        `data: ${JSON.stringify({
          text: 'Error interno.',
        })}\n\n`,
      );
    } finally {
      res.end();
    }
  }
}
