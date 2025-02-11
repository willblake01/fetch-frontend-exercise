import Image from "next/image";
import logo from "../public/images/fetch-logo.png";

const Appbar = () => {
  return (
    <div className='flex appBar'>
      <Image alt='logo' className='logo' src={logo} />
    </div>
  );
}

export default Appbar
