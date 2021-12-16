// import axios from "axios";
// import { Categories } from "../models/Categories";
// import { BASE_URL, get } from "./base";

// interface CategoryResponse {
//   doc: Categories[];
// }

// export const fetchCategories = () => {
//   const url = BASE_URL + "/categories";

//   return get<CategoryResponse>(url, {});
// };

// export const fetchOneCategory = (id: string) => {
//   const url = BASE_URL + "/categories/" + id;

//   return axios.get<CategoryResponse>(url);
// };

import axios from "axios";
import { Category } from "../models/Categories";
import { CategoriesSingle } from "../models/CategorySingle";
import { AUTH_TOKEN, BASE_URL } from "./base";
import { createCategoryRequest } from "./interfaces/categoryInterfaces";

export interface CategoryRequest {
  query?: string;
}

export const fetchCategories = (data: CategoryRequest) => {
  const url = BASE_URL + "/categories";

  return axios
    .get<Category[]>(url, { params: data })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((e) => console.log(e));
};

export const fetchOneCategory = (id: string) => {
  const url = BASE_URL + "/categories/" + id;

  return axios.get<CategoriesSingle>(url, {
    headers: { Authorization: AUTH_TOKEN },
  });
};

export const createCategory = (data: createCategoryRequest) => {
  const url = BASE_URL + "/categories";
  // console.log(id);

  return axios
    .post<Category>(url, data, {
      headers: { Authorization: AUTH_TOKEN },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert("some error occured, please try again");
      window.location.href = "/retailor-overview";
    });
};

export const changeCategoryPhoto = (id: string, data: any) => {
  const form = new FormData();
  // console.log(form);
  form.append("photo", data);

  // form.append("image", data);
  const url = BASE_URL + "/categories/" + id;

  return axios({
    method: "PATCH",
    url: url,
    data: form,
    headers: {
      Authorization: AUTH_TOKEN,
      "Content-type": "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      alert("photo uploaded successfully");
      return response.data.doc;
    })
    .catch((e) => {
      alert("some error occured, please create your category again.");
      axios.delete(url, { headers: { Authorization: AUTH_TOKEN } });
      window.location.href = "/create-category";
    });
};
