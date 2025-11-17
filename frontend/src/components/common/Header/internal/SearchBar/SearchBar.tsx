import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";
import Search from "@public/search.svg";
import { handleSearchSubmit } from "./searchActions";

export const SearchBar = () => {
  return (
    <div className="relative flex flex-col items-start justify-center bg-white p-4">
      {/* <form>의 'action' prop이 서버 액션 함수를 직접 호출 */}
      <form
        action={handleSearchSubmit}
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
            />
          </button>

          <input
            id="search-input"
            type="search"
            name="query"
            className="mx-2 flex-1 bg-transparent py-2 text-base text-black outline-none"
            aria-label="Search input"
          />
        </div>
      </form>
    </div>
  );
};
