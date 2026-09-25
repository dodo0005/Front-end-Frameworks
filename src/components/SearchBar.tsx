interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ query, onChange }: SearchBarProps) => {
  return (
    <div className="header-search">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
        />
      </div>
    </div>
  );
};

export default SearchBar;