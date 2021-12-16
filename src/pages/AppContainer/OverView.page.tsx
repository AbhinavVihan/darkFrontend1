import { FC, memo, useEffect } from "react";
import { Link } from "react-router-dom";
// import { fetchProducts } from "../../api/products";

interface Props {}

const OverView: FC<Props> = (props) => {
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {};

  return (
    <div>
      This is OverView Page
      <button className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28">
        click Me
      </button>
      {/* {details && <img alt="me" src={details} />} */}
      <Link to="/categories">
        <span className="text-blue-500">Search by categories</span>
      </Link>
    </div>
  );
};

OverView.defaultProps = {};

export default memo(OverView);
