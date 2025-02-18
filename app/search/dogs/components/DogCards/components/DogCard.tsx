import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import type { Dog } from '@/app/types/Dog'

interface DogCardProps {
  dog: Dog
}

const DogCard = ({ dog }: DogCardProps) => {
  const dogAgeText = dog.age > 1 ? 'years' : 'year'

  return (
    <Card sx={{borderRadius: '0.625rem', boxShadow: 3, maxWidth: 245 }}>
      <CardActionArea>
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
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {`${dog.age} ${dogAgeText} old ${dog.breed} in ${dog.zip_code}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
)}

export default DogCard
