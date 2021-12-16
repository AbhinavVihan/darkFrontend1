import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneCategory } from "../../actions/categories.actions";
import {
  selectedCategorySelector,
  selectedErrorSelector,
  selectedLoadingSelector,
} from "../../selectors/categories.selectors";
import { useAppSelector } from "../../store";

interface Props {}

const CategoriesDetails: FC<Props> = (props) => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = useAppSelector(selectedCategorySelector);
  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneCategory(categoryId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (error) {
    return (
      <div>
        <div className="text-red-500">{error}</div>
        <Link to={"/categories/" + (+categoryId + 1)}>next category</Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link className="text-blue-600" to="/categories">
          Back to Categories
        </Link>
      </div>
      {loading && <div className="text-green-500">Loading Category...</div>}

      {category && (
        <div>
          this is the details of {category.categoryName} category (id:{" "}
          {categoryId}) whose image is
          <Link to={"/categories/" + categoryId + "/products"}>
            <img
              alt="imhfdb"
              src={"http://localhost:8000/img/categories/" + category.photo}
            />
          </Link>
        </div>
      )}
      <Link to={"/categories/" + (categoryId + 1)}>next category</Link>
    </div>
  );
};

CategoriesDetails.defaultProps = {};

export default memo(CategoriesDetails);
