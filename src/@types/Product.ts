export interface ProductItem {
  _id: number;
  image: {
    asset: {
      _ref: string;
    };
  }[];
  name: string;
  slug: {
    current: string;
  };
  price: number;
  details: string;
  quantity?: number;
}
