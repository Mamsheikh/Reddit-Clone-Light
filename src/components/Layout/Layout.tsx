import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: any;
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
