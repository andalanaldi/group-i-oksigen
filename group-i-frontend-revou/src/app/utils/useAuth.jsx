import { useEffect } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { hasJwtAtom, isJwtExpiredAtom } from '../jotai-functions/dynamicatoms';

export const useAuthPremium = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const { isPremium } = response.data.data;

        if (!isPremium) {
          // Redirect to a specific page if the user is not premium
          router.push('/subscribe-oksigenplus');
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);
};

export const useJWT = () => {
  const router = useRouter();
  const [hasJwt] = useAtom(hasJwtAtom);
  const [isJwtExpired] = useAtom(isJwtExpiredAtom);

  if (!hasJwt || isJwtExpired) {
    router.push('/login');
  }
};