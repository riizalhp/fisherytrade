'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === '/login') {
      setChecked(true);
      return;
    }
    let isMounted = true;
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (!data.authenticated) {
          const next = pathname && pathname !== '/' ? `?next=${encodeURIComponent(pathname)}` : '';
          router.replace(`/login${next}`);
        } else {
          setChecked(true);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        router.replace('/login');
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (pathname === '/login') return <>{children}</>;
  if (!checked) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Memeriksa sesi admin...
      </div>
    );
  }

  return <>{children}</>;
}
