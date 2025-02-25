import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
