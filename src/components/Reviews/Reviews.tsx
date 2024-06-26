import { FC, useState } from 'react'
import { Flex, List, Pagination } from 'antd'
import { useQuery } from '@tanstack/react-query'
import reviewService from '../../api/entities/review'
import {
  ERROR_MESSAGE,
  NO_INFORMATION_ABOUT_REVIEWS,
} from '../../utils/consts/textConsts'

interface ReviewsProps {
  movieId: number
}

export const Reviews: FC<ReviewsProps> = ({ movieId }) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, status } = useQuery({
    queryKey: ['reivews', movieId, page, pageSize],
    queryFn: ({ signal }) =>
      reviewService.getReview({
        config: {
          params: {
            movieId,
            page,
            limit: pageSize,
          },
          signal,
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
    return <p>{NO_INFORMATION_ABOUT_REVIEWS}</p>
  }

  return (
    <Flex gap="large" vertical>
      <List
        itemLayout="vertical"
        dataSource={data.docs}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.author} />
            {item.review}
          </List.Item>
        )}
        size="small"
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
