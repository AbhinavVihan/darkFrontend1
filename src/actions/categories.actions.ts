import { Categories, Category } from "../models/Categories";
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
} from "./action.constants";

export const categoryQueryChangedAction = (
  query: string,
  loadingList: boolean
) => ({
  type: CATEGORIES_QUERY_CHANGED,
  payload: { query, loadingList },
});

export const categoryQueryCompletedAction = (
  query: string,
  categories: Category[]
) => ({
  type: CATEGORIES_QUERY_COMPLETED,
  payload: { query, categories },
});

export const fetchOneCategory = (id: string) => ({
  type: CATEGORIES_FETCH_SINGLE,
  payload: id,
});

export const fetchOneCategoryComplete = (category: Categories) => ({
  type: CATEGORIES_FETCH_SINGLE_COMPLETE,
  payload: category,
});

export const fetchSingleCategoryError = (id: string, msg: string) => ({
  type: CATEGORIES_FETCH_SINGLE_ERROR,
  payload: { id, msg },
});

export const categoryChoose = (id: string) => ({
  type: CATEGORY_CHOOSE,
  payload: id,
});

// export const createCategoryBegin = (data: createCategoryRequest) => ({
//   type: CREATE_CATEGORY_BEGIN,
//   payload: data,
// });
export const createCategoryBegin = () => ({
  type: CREATE_CATEGORY_BEGIN,
});

export const createCategoryComplete = (category: Category) => ({
  type: CREATE_CATEGORY_COMPLETE,
  payload: category,
});

export const createCategoryError = (msg: string) => ({
  type: CREATE_CATEGORY_ERROR,
  payload: msg,
});

export const uploadCategoryPhotoBegin = () => ({
  type: UPLOAD_PHOTO_FOR_CATEGORY_BEGIN,
});

export const uploadCategoryPhotoComplete = () => ({
  type: UPLOAD_PHOTO_FOR_CATEGORY_COMPLETED,
});

export const uploadCategoryPhotoError = () => ({
  type: UPLOAD_PHOTO_FOR_CATEGORY_ERROR,
});
