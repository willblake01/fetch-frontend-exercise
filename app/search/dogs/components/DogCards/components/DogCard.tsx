import { Dispatch, SetStateAction, useContext } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Context } from '@/app/context';
import type { Dog } from '@/app/types/Dog'

interface DogCardProps {
  dog: Dog
}

interface PageContext {
  savedDogs: string[]
  setSavedDogs: Dispatch<SetStateAction<string[]>>
}

const DogCard = ({ dog }: DogCardProps) => {
  const { savedDogs, setSavedDogs} =  useContext(Context
    ) as unknown as PageContext

  const handleSavedDogs = () => {
    if (!savedDogs.includes(dog.id)) {
      setSavedDogs([...savedDogs, dog.id])
    } else {
      const updatedSavedDogs = savedDogs.filter((id) => id !== dog.id)
      setSavedDogs(updatedSavedDogs)
    }
  }

  const dogAgeText = dog.age > 1 ? 'years' : 'year'

  return (
    <Card sx={{ border: savedDogs.includes(dog.id) ? '4px solid #7C1E6F' : null, borderRadius: '0.625rem', boxShadow: 3, maxWidth: 245 }}>
      <CardActionArea onClick={handleSavedDogs}>
        <CardMedia
          component='img'
          image={dog.img}
          alt='dog image'
          sx={{ height: 300, width: 245 }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {dog.name}
          </Typography>
          <Typography noWrap={false} variant='body2' sx={{ color: 'text.secondary' }}>
            {`${dog.age} ${dogAgeText} old ${dog.breed} in ${dog.zip_code}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
)}

export default DogCard
