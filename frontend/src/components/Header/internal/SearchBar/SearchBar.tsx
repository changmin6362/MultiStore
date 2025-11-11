import { useState } from "react";
import { ImageContainer } from "@/components/ImageContainer/ImageContainer";
import { useRouter } from "next/navigation";
import Search from "@public/search.svg";

export const SearchBar = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center p-4 relative
      bg-white">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col items-start justify-center gap-2.5 px-4
          relative self-stretch w-full flex-[0_0_auto] rounded-[10px]
          overflow-auto border border-solid border-blue-500 shadow-2xs"
        role="search"
        aria-label="Search"
      >
        <div className="flex items-center w-full">
          <button
            type="submit"
            aria-label="Search Submit"
            className="flex items-center"
          >
            <ImageContainer
              imageSrc={Search}
              width={32}
              height={32}
              alt="SearchIcon"
              onClick={() => handleSearchSubmit}
            />
          </button>

          <input
            id="search-input"
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 py-2 text-base outline-none bg-transparent mx-2"
            aria-label="Search input"
          />
        </div>
      </form>
    </div>
  );
};
