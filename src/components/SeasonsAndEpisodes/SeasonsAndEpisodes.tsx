import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import seasonService from '../../api/entities/season'
import { Card, Flex, Image, List, Pagination } from 'antd'
import {
  ERROR_MESSAGE,
  NO_INFORMATION_ABOUT_SERIES,
  POSTER_EMPTY_URL,
} from '../../utils/consts/textConsts'
import styles from './SeasonsAndEpisodes.module.scss'

interface SeasonsAndEpisodesProps {
  movieId: number
}

export const SeasonsAndEpisodes: FC<SeasonsAndEpisodesProps> = ({
  movieId,
}) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)

  const { data, status } = useQuery({
    queryKey: ['reivews', movieId, page, pageSize],
    queryFn: () =>
      seasonService.getSeason({
        config: {
          params: {
            movieId,
            page,
            limit: pageSize,
            sortField: 'number',
            sortType: 1,
          },
        },
      }),
    enabled: !!movieId,
    select: (data) => data.data,
  })

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  if (status === 'pending') {
    return null
  }

  if (status === 'error') return <p>{ERROR_MESSAGE}</p>

  if (!data.docs.length) {
    return <p>{NO_INFORMATION_ABOUT_SERIES}</p>
  }

  return (
    <Flex gap="large" vertical>
      <List
        itemLayout="vertical"
        dataSource={data.docs}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
            <Flex wrap="wrap" gap="small" justify="center">
              {item.episodes.map((episode) => (
                <Card
                  className={styles.card}
                  cover={
                    <Image
                      height={200}
                      alt={`Постер '${episode.name}'`}
                      src={episode.still.url}
                      fallback={POSTER_EMPTY_URL}
                    />
                  }
                  key={episode.number}
                  title={episode.name}
                >
                  {episode.enName}
                </Card>
              ))}
            </Flex>
          </List.Item>
        )}
      />
      <Flex justify="flex-end">
        <Pagination
          showQuickJumper
          current={page}
          pageSize={pageSize}
          total={data.total}
          onChange={handleChangePage}
        />
      </Flex>
    </Flex>
  )
}
