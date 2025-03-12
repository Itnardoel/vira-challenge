import express from 'express';
import cors from 'cors';
import { config } from './config/env.ts';
import routes from './routes/index.ts';
import { startCronJob } from './services/schedulerService.ts';

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Route to verify the server is running
app.get('/', (req, res) => {
  res.send('Express server with TypeScript running correctly');
});

// Start the cron job to verify records
startCronJob();

// Start the server
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port} in ${config.nodeEnv} mode`);
}); 