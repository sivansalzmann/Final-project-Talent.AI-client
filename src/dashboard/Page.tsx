import AppBar from "./AppBar";
import Footer from "./Footer";
import SideBar from "./SideBar";

const Page = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ margin: "20px" }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
