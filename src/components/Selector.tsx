/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useRef, useState } from "react";

interface Option {
  id?: string;
  label?: string | undefined;
}

interface Props {
  options: Option[];
  label: string;
  id: string;
  selectedVal: string;
  handleChange: Function;
}

const Selector: React.FC<Props> = ({
  options = [],
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBankCode, setSelectedBankCode] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectOption = (option: { [key: string]: string }) => {
    setQuery("");
    setSelectedBankCode(option[id]);
    handleChange(option[id]);
    setIsOpen(false);
  };

  function toggle(e: MouseEvent) {
    if (e && e.target === inputRef.current) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  const getDisplayValue = (): string => {
    if (query) return query;
    if (selectedVal) {
      const selectedOption = options.find(
        (option) => option[id] === selectedVal
      );
      return selectedOption ? selectedOption[label] || "" : "";
    }
    return "";
  };

  const filter = (options: Option[]): Option[] => {
    return options.filter(
      (option) => option[label]?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  return (
    <div className="relative dropdown">
      <div className="w-full">
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
            setIsOpen(true);
          }}
          onClick={toggle}
          placeholder="Select an option"
          className="p-2 border border-gray-500 rounded-md w-full h-10"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 options overflow-y-auto max-h-40 transition duration-200 transform bg-white border border-gray-300 rounded-md"
          style={{
            top: inputRef.current?.clientHeight! + 2,
            left: 0,
            right: 0,
          }}
        >
          {filter(options).map((option, index) => (
            <div
              key={`${id}-${index}`}
              onClick={() => selectOption(option)}
              className={`option px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                option[id] === selectedBankCode ? "bg-gray-200 font-bold" : ""
              }`}
            >
              {option[label]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
