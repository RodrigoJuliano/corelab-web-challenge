import styles from './Search.module.scss'
import SearchIcon from '../../assets/Search.svg'
import IconButton from '../IconButton'
import FiltersIcon from '../../assets/filters.png'

interface ISearch {
  placeholder: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onClickFilter: () => void
}

const Search = (props: ISearch): JSX.Element => {
  const { placeholder, value, onChange, onClickFilter } = props

  return (
    <div className={styles.searchContainer}>
      <img src={SearchIcon} alt="search icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <IconButton icon={FiltersIcon} onClick={onClickFilter} />
    </div>
  )
}

export default Search
