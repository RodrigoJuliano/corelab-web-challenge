import styles from './Search.module.scss'

interface ISearch {
  placeholder: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Search = (props: ISearch) => {
  const { placeholder, value, onChange } = props

  return (
    <input
      className={styles.search}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
