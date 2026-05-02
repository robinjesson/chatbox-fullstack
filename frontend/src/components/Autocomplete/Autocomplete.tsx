interface AutocompleteProps<T> {
  options: T[];
}

const Autocomplete = <T extends { name: string; id: number } | string>({
  options,
}: AutocompleteProps<T>) => {
  return (
    <div className="dropdown w-full">
      <input
        tabIndex={0}
        type="text"
        placeholder="Chercher..."
        className="input input-bordered w-full"
      />
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow mt-1 border border-base-300"
      >
        {options.map((option) => (
          <li key={typeof option === "string" ? option : option.id}>
            <a>{typeof option === "string" ? option : option.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
