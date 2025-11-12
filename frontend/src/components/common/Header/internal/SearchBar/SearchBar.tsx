import { useState } from "react";
import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";
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
    <div className="relative flex flex-col items-start justify-center bg-white p-4">
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex w-full flex-[0_0_auto] flex-col items-start justify-center gap-2.5 self-stretch overflow-auto rounded-[10px] border border-blue-500 px-4 shadow-2xs"
        role="search"
        aria-label="Search"
      >
        <div className="flex w-full items-center">
          <button
            type="submit"
            aria-label="Search Submit"
            className="flex items-center"
          >
            <ImageViewer
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
            className="mx-2 flex-1 bg-transparent py-2 text-base outline-none"
            aria-label="Search input"
          />
        </div>
      </form>
    </div>
  );
};
