import { FC, memo, useEffect } from "react";
import logo from "../../src/logo.jpg";

interface Props {}

const FrontImage: FC<Props> = (props) => {
  // console.log("Front image rendering");
  useEffect(() => {
    // console.log("front image rendering for the first time");
  }, []);

  return (
    <div className="bg-black sm:h-3/6 lg:h-screen lg:w-full md:w-full md:h-auto">
      <img
        className="w-full lg:h-96 sm:h-3/6 sm:rounded-tl-none md:rounded-tr-none sm:rounded-tr-none md:rounded-tl-none lg:rounded-xl md:rounded-xl"
        alt="logo"
        src={logo}
      />
    </div>
  );
};

FrontImage.defaultProps = {};

export default memo(FrontImage);
