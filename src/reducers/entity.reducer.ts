import { Entity } from "../models/Entity";

export interface EntityState<T extends Entity = Entity> {
  byId: {
    [id: string]: T;
  };
  selectedId?: string;
  // imageCover?: {
  //   [id: string]: string;
  // };
  // imageFront?: {
  //   [id: string]: string;
  // };
  // image1?: {
  //   [id: string]: string;
  // };
  // image2?: {
  //   [id: string]: string;
  // };
  // image3?: {
  //   [id: string]: string;
  // };
  // photo?: {
  //   [id: string]: string;
  // };
  loadingOne: boolean;
  loadingList: boolean;
  errorOne?: string;
}

export const initialEntityState = {
  byId: {},
  loadingOne: false,
  loadingList: false,
};

export const getIds = (entities: Entity[]) => {
  if (entities) {
    return entities.map((e) => e._id);
  }
};

export const select = (state: EntityState, id: string) => ({
  ...state,
  selectedId: id,
  loadingOne: true,
  errorOne: undefined,
});

export const setErrorForOne = (state: EntityState, id: string, msg: string) => {
  if (state.selectedId !== id) {
    return state;
  }

  return { ...state, errorOne: msg, loadingOne: false };
};

export const addOne = (
  state: EntityState,
  entity: Entity,
  loading?: boolean
) => {
  const newLoading = loading === undefined ? state.loadingOne : loading;
  return {
    ...state,
    byId: { ...state.byId, [entity._id]: entity },
    loadingOne: newLoading,
  };
};

export const addMany = (state: EntityState, entities: Entity[]) => {
  if (entities && entities.length === 0) {
    return state;
  }

  const entityMap =
    entities &&
    entities.reduce((prev, entity) => {
      // entity.images = imgs;
      return {
        ...prev,
        [entity._id]: entity,
      };
    }, {});

  return {
    ...state,

    byId: { ...state.byId, ...entityMap },
  };
};

// export const addImgFront = (state: ProductsState, entities: Product[]) => {
//   if (entities.length === 0) {
//     return state;
//   }

//   const entityMap = entities.reduce((prev, entity) => {
//     const img = entity.imageFront;

//     return {
//       ...prev,
//       [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
//     };
//   }, {});

//   return {
//     ...state,
//     imageFront: { ...state.byId, ...entityMap },
//   };
// };

// export const addImgCover = (state: ProductsState, entities: Product[]) => {
//   if (entities.length === 0) {
//     return state;
//   }

//   const entityMap = entities.reduce((prev, entity) => {
//     const img = entity.imageCover;

//     return {
//       ...prev,
//       [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
//     };
//   }, {});

//   return {
//     ...state,

//     imageCover: { ...state.imageCover, ...entityMap },
//   };
// };

// export const addImg1 = (state: ProductsState, entities: Product[]) => {
//   if (entities.length === 0) {
//     return state;
//   }

//   const entityMap = entities.reduce((prev, entity) => {
//     const img = entity.images[0];

//     return {
//       ...prev,
//       [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
//     };
//   }, {});

//   return {
//     ...state,

//     image1: { ...state.image1, ...entityMap },
//   };
// };

// export const addImg2 = (state: ProductsState, entities: Product[]) => {
//   if (entities.length === 0) {
//     return state;
//   }

//   const entityMap = entities.reduce((prev, entity) => {
//     const img = entity.images[1];
//     return {
//       ...prev,
//       [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
//     };
//   }, {});

//   return {
//     ...state,

//     image2: { ...state.image2, ...entityMap },
//   };
// };

// export const addImg3 = (state: ProductsState, entities: Product[]) => {
//   if (entities.length === 0) {
//     return state;
//   }

//   const entityMap = entities.reduce((prev, entity) => {
//     const img = entity.images[2];
//     return {
//       ...prev,
//       [entity._id]: "https://dark-2.herokuapp.com/img/products/" + img,
//     };
//   }, {});

//   return {
//     ...state,

//     image3: { ...state.image3, ...entityMap },
//   };
// };
