import { useContext } from 'react';
import { HeroContext } from '../contexts/HeroContext';

export function useHero() {
  const value = useContext(HeroContext);

  return value;
}