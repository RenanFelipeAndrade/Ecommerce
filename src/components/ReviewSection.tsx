import { useState } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import ReactStars from "react-star-rating-component";

export const ReviewSection = () => {
  const [stars, setStars] = useState(5);
  const [generalRating, setGeneralRating] = useState<undefined | number>();
  return (
    <section className="review-section-container">
      <h2>Review the product</h2>
      <div>
        <h3>General rating</h3>
        <ReactStars
          name="rating"
          starColor="#F02D34"
          value={generalRating || stars}
          editing={true}
          onStarClick={(value) => setGeneralRating(value)}
          onStarHover={(value) => {
            if (!generalRating) return setStars(value);
          }}
          renderStarIcon={(index, value) => {
            return (
              <span>
                {index <= value ? (
                  <IoIosStar size={20} />
                ) : (
                  <IoIosStarOutline size={20} color="F02D34" />
                )}
              </span>
            );
          }}
          renderStarIconHalf={() => {
            return (
              <span>
                <span style={{ position: "absolute", color: "F02D34" }}>
                  <IoIosStarHalf color="F02D34" size={20} />
                </span>
                <span>
                  <IoIosStarOutline style={{ color: "F02D34" }} size={20} />
                </span>
              </span>
            );
          }}
        />
        <div className="comment-section">
          <h3>Describe your experience</h3>
          <textarea name="comment" id="comment"></textarea>
        </div>
      </div>
    </section>
  );
};
