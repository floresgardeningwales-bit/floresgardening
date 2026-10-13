'use client';
import { useEffect } from 'react';
import { startGardenVisitors } from './garden-visitors/engine';

// Every so often a bee, butterfly, ladybird, robin, hedgehog, snail or woodlouse
// wanders onto the page, then scurries or flies off (sooner if you go near it).
// Add ?visitors=all (or ?visitors=hedgehog etc.) to any page URL to preview them.
export default function GardenVisitors() {
  useEffect(() => startGardenVisitors(), []);
  return null;
}
