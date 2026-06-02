'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingInvestigation from '@/components/LoadingInvestigation';
import { scanWebsite } from '@/lib/api';

export default function AnalyzingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!url) {
      router.push('/');
      return;
    }

    const performScan = async () => {
      try {
        // Wait 5 seconds for the animation to complete before redirecting
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Perform the actual scan
        const result = await scanWebsite(url);

        // Store result in sessionStorage for the results page
        sessionStorage.setItem('lastScanResult', JSON.stringify(result));

        // Generate an ID based on URL
        const scanId = Buffer.from(url).toString('base64');

        // Redirect to results page
        router.push(`/results/${scanId}`);
      } catch (error) {
        console.error('Scan failed:', error);
        router.push('/');
      } finally {
        setIsScanning(false);
      }
    };

    performScan();
  }, [url, router]);

  return <LoadingInvestigation />;
}
