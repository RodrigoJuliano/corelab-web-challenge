interface IButton {
  onClick: () => void
  text: string
}

const Button = (props: IButton) => {
  const { text, onClick } = props

  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
