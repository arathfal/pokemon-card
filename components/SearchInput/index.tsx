import { InputHTMLAttributes } from 'react';

interface SearchInputProps {
  value: string;
  onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      className="w-96 h-10 p-2 rounded-md text-slate-900 "
      type="search"
      value={value}
      onChange={onChange}
      placeholder='Search your pokemon...'
    />
  );
};

export default SearchInput;
