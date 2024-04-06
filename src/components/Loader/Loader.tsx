import classNames from 'classnames'
import styles from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classNames(styles.Loader, className)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
