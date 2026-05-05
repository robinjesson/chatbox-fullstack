import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AutocompleteProps {
  options: string[];
  onSelect: (value: string) => void;
  onInputChange: (value: string) => void;
}

const Autocomplete = ({
  options,
  onSelect,
  onInputChange,
}: AutocompleteProps) => {
  const { register, subscribe } = useForm<{ val: string }>();

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        onInputChange(values.val ?? "");
      },
    });

    return () => unsubscribe();
  }, [onInputChange, subscribe]);

  return (
    <div className="dropdown w-full">
      <input
        type="text"
        placeholder="Chercher..."
        className="input w-full"
        {...register("val")}
      />
      <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow mt-1 border border-base-300">
        {options.map((option) => (
          <li key={option}>
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                onSelect(option);
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
