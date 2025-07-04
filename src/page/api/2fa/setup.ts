import axios from 'axios';

export default async function handler(req, res) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/2fa/setup`, {
    email: 'tokossmotors@gmail.com',
  });
  res.status(200).json(response.data);
}
