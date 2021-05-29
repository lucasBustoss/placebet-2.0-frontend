import axios from 'axios';
import * as dotenv from 'dotenv';
// const path = 'src/.env';
// dotenv.config({ path });

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
