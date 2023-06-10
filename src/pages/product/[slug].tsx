import { client, urlFor } from "lib/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Product from "@/components/Product";
import { useState } from "react";
import { useStateContext, UseStateContextProps } from "@/context/StateContext";
import { CartItem } from "@/@types/CartItem";
import {
  KeenSliderHooks,
  KeenSliderOptions,
  useKeenSlider,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { KeenSliderInstance } from "keen-slider";
import { ProductReviews } from "@/components/ProductReviews";
import { ReviewSection } from "@/components/ReviewSection";

interface ProductDetailsProps {
  product: CartItem;
  products: CartItem[];
}
interface Breakpoints {
  [key: string]: Omit<
    KeenSliderOptions<{}, {}, KeenSliderHooks>,
    "breakpoints"
  >;
}

const ProductDetails = ({ product, products }: ProductDetailsProps) => {
  const [index, setIndex] = useState<number>(0);
  const { name, image, price, details } = product;
  const { setShowCart, incQty, decQty, qty, onAdd } =
    useStateContext() as UseStateContextProps;
  let intervalIds: number[] = [];
  const { fiveStar, fourStar, threeStar, twoStar, oneStar, total } =
    product.reviews;
  const generalRating = Number(
    (
      (1 -
        (fiveStar + fourStar + threeStar + twoStar + oneStar) / (5 * total)) *
      5
    ).toFixed(1)
  );

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  const setBreakpoints = () => {
    let currentSize = 540;

    // decimal number to show part of next product
    let perViewNumber = 1 + 0.4;
    let breakpoints: Breakpoints = {};
    for (let i = 1; i < products.length; i++) {
      breakpoints = {
        ...breakpoints,
        ...{
          [`(min-width: ${currentSize}px)`]: {
            slides: { perView: perViewNumber },
          },
        },
      };
      if (i === 1) currentSize = 768;
      else currentSize += 256;
      perViewNumber += 1;
    }
    return breakpoints;
  };

  const [sliderRef, _] = useKeenSlider<HTMLDivElement>({
    loop: true,
    created: (event) => {
      autoPlay(true, event);
    },
    dragStarted: (event) => {
      autoPlay(false, event);
    },
    dragEnded: (event) => {
      autoPlay(true, event);
    },
    breakpoints: setBreakpoints(),
    slides: {
      perView: 1,
    },
  });

  function autoPlay(run: boolean, event: KeenSliderInstance) {
    intervalIds.forEach((intervalId: number) => clearInterval(intervalId));
    intervalIds = [];
    if (run && intervalIds.length === 0) {
      const newIntervalId = setInterval(event.next, 5000);
      intervalIds.push(Number(newIntervalId));
    }
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]).toString()}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item).toString()}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={`image ${i}`}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <ProductReviews generalRating={generalRating} total={total} />
          <div>
            <h4>Details:</h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div
            className="maylike-products-container keen_slider"
            ref={sliderRef}
          >
            {products.map((item, i) => (
              <Product key={i} product={item} />
            ))}
          </div>
        </div>
      </div>
      <ReviewSection />
    </div>
  );
};
export default ProductDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
   slug {
    current
   } 
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product: CartItem) => ({
    params: { slug: product.slug.current },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "product" && slug.current == '${params!.slug}'][0]`;
  const productQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return { props: { products, product } };
};
