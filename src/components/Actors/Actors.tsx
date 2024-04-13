import { FC } from 'react'
import { Person } from '../../api/types/movies'
import { Avatar, Card, List } from 'antd'

interface ActorsProps {
  actors: Person[]
}
//FIXME: думаю можно вынести логику отображения листа, так как лист будет одинаковый в актёрах и отзывах(и карточки тоже)
export const Actors: FC<ActorsProps> = ({ actors }) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 3 }}
      pagination={{
        position: 'bottom',
        align: 'center',
      }}
      dataSource={actors}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.name}>
            <Card.Meta
              avatar={<Avatar shape="square" size={64} src={item.photo} />}
              title={item.description}
              description={item.enProfession}
            />
          </Card>
        </List.Item>
      )}
    />
  )
}
