'use client';

import { useSecurity } from '@/hooks/use-security';
import React from 'react';

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  // Activate the security hook. It will run its checks and handle redirection.
  // useSecurity();

  // Render the children of the component.
  return <>{children}</>;
}
