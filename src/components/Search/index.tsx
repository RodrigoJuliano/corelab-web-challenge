interface ISearch {
  placeholder: string
  value: string
  onChange: () => void
}

const Search = (props: ISearch) => {
  const { placeholder, value, onChange } = props

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
