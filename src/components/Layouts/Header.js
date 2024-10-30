import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useEffect, useState } from "react";
import { Search } from "../Sections/Search";
import { DropDownLoggedIn } from "../index";
import { DropDownLoggedOut } from "../index";
import { useCart } from "../../context";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const {cartList} = useCart();
  const [searchSection, setSearchSection] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="main">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">

          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="CodeBook Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
          </Link>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span onClick={() => setDarkMode(!darkMode)} className="text-2xl cursor-pointer dark:text-white bi bi-moon"></span>

            <span onClick={() => setSearchSection(!searchSection)} className="text-2xl cursor-pointer mr-5 dark:text-white bi bi-search"></span>

            <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
              <span className="text-2xl bi bi-cart-fill relative">
                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span>
              </span>
            </Link>
            
            <span onClick={() => setDropdown(!dropdown)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
            {dropdown && (token ? <DropDownLoggedIn setDropdown={setDropdown} /> : <DropDownLoggedOut setDropdown={setDropdown} />)}

          </div>

        </div>
      </nav>
      {/* if searchSection evaluates to true, the Search component will be rendered. */}
      {searchSection && <Search setSearchSection={setSearchSection} />}
    </header>
  )
}
