export const NavButton = ({ active, page, setActive, open, setOpen }) => {
  return (
    <button
      onClick={() => {
        setActive(page);
        // setOpen(!open);
      }}
      className={`hover:bg-blizzard-600  mt-1 text-lg hover:text-white font-bold  mr-4 px-5 p-2 rounded-full mb-2 md:text-left  ${
        active === page ? "bg-white" : "text-blizzard-100"
      }`}
    >
      {page}
    </button>
  );
};
