import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { DogMatch } from '@/app/types/Dog'

interface DogMatchProps {
  dog: DogMatch
}

const DogCard = ({ dog }: DogMatchProps) => {
  const { age, breed, img, name, zip_code  } = dog

  const dogAgeText = (age) > 1 ? 'years' : 'year'

  return (
    <Card sx={{borderRadius: '0.625rem', boxShadow: 3, maxWidth: 445 }}>
      <CardMedia
        component='img'
        image={img}
        alt='dog image'
        sx={{ height: 'auto', width: 445 }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography noWrap={false} variant='body2' sx={{ color: 'text.secondary' }}>
          {`Meet your new furry friend!!! ${name} is ${age} ${dogAgeText} old. This ${breed} will make an excellent family member and is available to pick up or ship from ${zip_code}.`}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DogCard
