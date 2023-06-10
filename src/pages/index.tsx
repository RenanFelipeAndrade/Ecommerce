import { Banner } from "@/@types/Banner";
import { ProductItem } from "@/@types/Product";
import { Product, FooterBanner, HeroBanner } from "@/components";
import { GetServerSideProps } from "next";
import { client } from "../../lib/client";
interface HomeProps {
  products: ProductItem[];
  bannerData: Banner[];
}
const Home = ({ products, bannerData }: HomeProps) => {
  return (
    <>
      {bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);
  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);
  return { props: { products, bannerData } };
};
