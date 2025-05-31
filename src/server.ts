import { listen } from './app';
import { APP_PORT } from './config/dotenv.config';

listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
