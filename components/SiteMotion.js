'use client';
import { useEffect } from 'react';
import { startSiteMotion } from './motion/engine';

export default function SiteMotion() {
  useEffect(() => startSiteMotion(), []);
  return null;
}
