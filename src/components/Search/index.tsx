import { useState } from 'react'
import SearchIcon from '../../assets/Search.svg'
import styles from './Search.module.scss'

interface SearchProps {
  placeholder: string
  onSubmit: (s: string) => void
}

const Search = (props: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const { placeholder, onSubmit } = props

  return (
    <div className={styles.searchContainer}>
      <img src={SearchIcon} alt="search icon" />
      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') onSubmit(search)
        }}
      />
    </div>
  )
}

export default Search
