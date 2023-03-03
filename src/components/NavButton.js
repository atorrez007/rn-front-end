export const NavButton = ({ active, page, setActive }) => {
  return (
    <button
      onClick={() => {
        setActive(page);
      }}
      className={`hover:bg-blizzard-600 hover:text-white mr-4 px-5 p-2 rounded-full mb-2 ${
        active === page ? "bg-white" : "text-blizzard-100"
      }`}
    >
      {page}
    </button>
  );
};
