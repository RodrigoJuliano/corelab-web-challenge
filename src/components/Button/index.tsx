import styles from './Button.module.scss'
import Loading from '../Loading'
import Conditional from '../Conditional'

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  text: string
  typeSubmit?: boolean
  loading?: boolean
}

const Button = (props: IButton): JSX.Element => {
  const { text, typeSubmit = false, loading = false, ...rest } = props

  return (
    <button
      className={styles.button}
      type={typeSubmit ? 'submit' : 'button'}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
    >
      <Conditional
        condition={!loading}
        fallback={<Loading size="20px" color="black" />}
      >
        {text}
      </Conditional>
    </button>
  )
}

export default Button
