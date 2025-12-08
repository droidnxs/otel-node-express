import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;

interface ProcessRequest {
  messageId: number;
  timestamp: string;
  data: string;
}

interface ProcessResponse {
  success: boolean;
  messageId: number;
  processedAt: string;
}

// Create Express app - auto-instrumentation will handle trace context and baggage extraction
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

// Process endpoint
app.post('/process', (req: Request, res: Response) => {
  try {
    const requestData: ProcessRequest = req.body;

    const response: ProcessResponse = {
      success: true,
      messageId: requestData.messageId,
      processedAt: new Date().toISOString(),
    };
    res.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 API Service started on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Process endpoint: http://localhost:${PORT}/process\n`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down API service...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n\nShutting down API service...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
