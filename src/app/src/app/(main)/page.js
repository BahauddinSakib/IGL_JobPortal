import ChoseProduct from "@/components/server_component/home/ChoseProduct";
import SuperDeals from "@/components/server_component/home/SuperDeals";
import Banner from "@/components/server_component/home/Banner";
import FlashSell from "@/components/server_component/home/FlashSell";
import BestSeller from "@/components/server_component/home/BestSeller";
import Features from "@/components/server_component/home/Features";
import Blogs from "@/components/server_component/home/Blogs";
import NewsLetter from "@/components/server_component/home/NewsLetter";

export default function Home() {
  return (
    <div>
      <main className="hello-main">
        <Banner></Banner>
        <SuperDeals></SuperDeals>
        <ChoseProduct></ChoseProduct>
        <FlashSell></FlashSell>
        <BestSeller></BestSeller>
        <Features></Features>
        <Blogs></Blogs>
        <NewsLetter></NewsLetter>
      </main>
    </div>
  );
}
