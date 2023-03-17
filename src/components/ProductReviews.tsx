import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import ReactStars from "react-star-rating-component";

interface ProductReviewsProps {
  generalRating: number;
  total: number;
}
export const ProductReviews = ({
  generalRating,
  total,
}: ProductReviewsProps) => {
  return (
    <div className="reviews">
      <ReactStars
        name="rating"
        starColor="#F02D34"
        value={generalRating}
        editing={false}
        renderStarIcon={(index, value) => {
          return (
            <span>
              {index <= value ? (
                <IoIosStar />
              ) : (
                <IoIosStarOutline color="F02D34" />
              )}
            </span>
          );
        }}
        renderStarIconHalf={() => {
          return (
            <span>
              <span style={{ position: "absolute", color: "F02D34" }}>
                <IoIosStarHalf color="F02D34" />
              </span>
              <span>
                <IoIosStarOutline style={{ color: "F02D34" }} />
              </span>
            </span>
          );
        }}
      />

      <p>({total})</p>
    </div>
  );
};
