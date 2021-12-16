import { Reducer } from "redux";

import {
  CATEGORIES_FETCH_SINGLE,
  CATEGORIES_FETCH_SINGLE_COMPLETE,
  CATEGORIES_FETCH_SINGLE_ERROR,
  CATEGORIES_QUERY_CHANGED,
  CATEGORIES_QUERY_COMPLETED,
  CATEGORY_CHOOSE,
  CREATE_CATEGORY_BEGIN,
  CREATE_CATEGORY_COMPLETE,
  CREATE_CATEGORY_ERROR,
  UPLOAD_PHOTO_FOR_CATEGORY_BEGIN,
  UPLOAD_PHOTO_FOR_CATEGORY_COMPLETED,
  UPLOAD_PHOTO_FOR_CATEGORY_ERROR,
} from "../actions/action.constants";
import { Category } from "../models/Categories";
import {
  addMany,
  addOne,
  EntityState,
  getIds,
  initialEntityState,
  select,
  setErrorForOne,
} from "./entity.reducer";

export interface CategoriesState extends EntityState<Category> {
  query: string;
  queryMap: { [query: string]: string[] };
  idForRetailor: string;
  createdCategory: string;
}

const initialState: CategoriesState = {
  ...initialEntityState,
  query: "",
  queryMap: {},
  idForRetailor: "",
  createdCategory: "",

  // photo: {},
};

export const categoryReducer: Reducer<CategoriesState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CATEGORIES_FETCH_SINGLE:
      return select(state, action.payload) as CategoriesState;
    case CATEGORIES_QUERY_CHANGED:
      const { query, loadingList } = action.payload;

      return {
        ...state,
        query: query,
        loadingList: loadingList,
      };
    case CATEGORIES_QUERY_COMPLETED:
      const categories = action.payload.categories as Category[];
      const categoriesIds = getIds(categories);

      const newState = addMany(state, categories) as CategoriesState;

      categories &&
        categories.reduce((prev, category) => {
          const img = category.photo;

          return {
            ...prev,
            [category._id]:
              "https://dark-2.herokuapp.com/img/categories/" + img,
          };
        }, {});

      return {
        ...newState,
        queryMap: {
          ...newState.queryMap,
          [action.payload.query]: categoriesIds,
        },
        loadingList: false,
      };
    case CATEGORIES_FETCH_SINGLE_COMPLETE:
      return addOne(state, action.payload.doc, false) as CategoriesState;
    case CATEGORIES_FETCH_SINGLE_ERROR:
      const { id, msg } = action.payload;
      return setErrorForOne(state, id, msg) as CategoriesState;
    case CATEGORY_CHOOSE:
      return { ...state, idForRetailor: action.payload };
    case CREATE_CATEGORY_COMPLETE:
      return {
        ...state,
        createdCategory: action.payload._id,
        loadingOne: false,
      };
    case UPLOAD_PHOTO_FOR_CATEGORY_BEGIN:
    case CREATE_CATEGORY_BEGIN:
      return { ...state, loadingOne: true };

    case UPLOAD_PHOTO_FOR_CATEGORY_COMPLETED:
    case UPLOAD_PHOTO_FOR_CATEGORY_ERROR:
    case CREATE_CATEGORY_ERROR:
      return { ...state, loadingOne: false };
    default:
      return state;
  }
};
