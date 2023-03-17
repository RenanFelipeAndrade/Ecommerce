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
  reviews: {
    fiveStar: number;
    fourStar: number;
    oneStar: number;
    threeStar: number;
    total: number;
    twoStar: number;
  };
  quantity?: number;
}
