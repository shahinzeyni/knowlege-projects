import { cookies } from 'next/headers';

const getToken = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  return token;
};

export default getToken;

//-------------------------

import getToken from '@/utils/getToken';

const requestConfig = async () => ({
  method: 'GET',
  headers: {
    businessId: '1',
    Authorization: `Bearer ${await getToken()}`,
  },
  next: {
    revalidate: 60,
  },
});
