import { Flex, Select } from 'antd'

export type PerPageValue = 10 | 20 | 30

interface PerPageProps {
  className?: string
  value: PerPageValue | null
  onChange: (value: PerPageValue) => void
}

const perPageValues: PerPageValue[] = [10, 20, 30]

const options = perPageValues.map((value) => ({
  value,
  label: value,
}))

export const PerPage = ({ className, value, onChange }: PerPageProps) => {
  return (
    <Flex align="center" gap="small" className={className}>
      отображать по:
      <Select value={value} onChange={onChange} options={options} />
    </Flex>
  )
}
