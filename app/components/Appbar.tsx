import Image from "next/image";
import logo from "../public/images/fetch-logo.png";

const AppBar = () => {
  return (
    <div className='flex app-bar'>
      <Image alt='logo' className='logo' priority src={logo} />
    </div>
  );
}

export default AppBar
