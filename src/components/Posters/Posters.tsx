import { useQuery } from '@tanstack/react-query'
import imageService from '../../api/entities/image'
import { Carousel, Image } from 'antd'
import { ERROR_MESSAGE } from '../../utils/consts/textConsts'

interface PostersProps {
  movieId: number
}

export const Posters = ({ movieId }: PostersProps) => {
  const { data, status } = useQuery({
    queryKey: ['images', movieId],
    queryFn: () =>
      imageService.getImage({
        config: {
          params: {
            movieId,
          },
        },
      }),
    enabled: !!movieId,
    select: (data) => data.data,
  })

  if (status === 'pending') {
    return null
  }

  if (status === 'error') return <p>{ERROR_MESSAGE}</p>

  return (
    <div>
      <Carousel autoplay>
        {data.docs.map((image) => (
          <Image width={300} key={image.id} src={image.url} />
        ))}
      </Carousel>
    </div>
  )
}
