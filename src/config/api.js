import axios from 'axios';

// const path = 'src/.env';
// dotenv.config({ path });

export default axios.create({
  baseURL: 'http://localhost:3000',
});
