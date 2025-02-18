import * as React from 'react';
import { DogCard } from './components'
import type { Dog } from '@/app/types/Dog'

interface DogCardsProps {
  dogs: Dog[]
}

const DogCards = ({ dogs }: DogCardsProps) => {
  return dogs.map(dog => <DogCard key={dog.id} dog={dog} />);
}

export default DogCards
