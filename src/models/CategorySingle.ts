export interface CategoriesSingle {
  status: string;
  doc: Doc;
}

export interface Doc {
  _id: string;
  categoryName: string;
  maker: Maker;
  description: string;
  photo: string;
  slug: string;
}

interface Maker {
  _id: string;
  name: string;
  role: string;
}
