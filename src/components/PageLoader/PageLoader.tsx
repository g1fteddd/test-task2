import classNames from 'classnames'
import styles from './PageLoader.module.scss'
import { Loader } from '../Loader'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(styles.PageLoader, className)}>
      <Loader />
    </div>
  )
}
