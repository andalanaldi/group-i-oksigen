import { atom } from 'jotai';
import axios from 'axios';
import jwt from 'jsonwebtoken';
// Atom to store the selected date
export const selectedDateAtom = atom(new Date());


export const hasJwtAtom = atom(() => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return Boolean(token);
});

export const isJwtExpiredAtom = atom(() => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) return true;

  const decodedToken = jwt.decode(token);
  const currentTime = Date.now().valueOf() / 1000;

  return decodedToken.exp < currentTime;
});

export const isPremiumAtom = atom(async (get) => {
  const hasJwt = get(hasJwtAtom);
  if (!hasJwt) return false;

  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  return decodedToken?.isPremium || false;
});

export const apiDataAtom = atom(
  async (get) => {
    const hasJwt = get(hasJwtAtom);
    const isJwtExpired = get(isJwtExpiredAtom);
    if (!hasJwt || isJwtExpired) {
      window.location.href = '/login';
      return;
    }

    const token = localStorage.getItem('token');

    // Fetch data for each city ID
    const results = await Promise.all([1, 2, 3, 4, 5].map(cityId =>
      axios.get(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/polution/${cityId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    ));

    // Combine the data from all responses into a single array
    const allData = results.flatMap(result => result.data.data);

    return allData;
  }
);

export const checkProfileAtom = atom(async (get) => {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = response.data;

    return data.isPremium;
  } catch (error) {
    console.error('Error checking profile:', error);
    return false;
  }
});

export const cityDataForDecemberAtom = atom(async (get) => {
  const selectedCityData = get(selectedCityDataAtom);

  if (!selectedCityData) {
    return null;
  }

  // Get the token from local storage
  const token = localStorage.getItem('token');

  // Fetch data for the selected city for the whole month of December
  const response = await axios.get(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}5/polution/${selectedCityData.cityId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data.data;
});

export const selectedCityDataAtom = atom(null);

export const selectedDateChangeAtom = atom(new Date());

export const selectedCityDataForDecemberAtom = atom(null);

export const checkEmailAtom = atom(async (get) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data.data.organization_name; // Return the organization name
  } catch (error) {
    console.error('Error checking profile:', error);
    return null;
  }
});

export const selectedCityPolutionDataAtom = atom(
  (get) => get(selectedCityDataAtom),
  async (get, set) => {
    const selectedCityData = get(selectedCityDataAtom);
    if (selectedCityData) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/polution/city/${selectedCityData.id}`
        );
        set(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
);