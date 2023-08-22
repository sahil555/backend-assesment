import React from "react";
import ReactHelmet from "../../components/ReactHelmet/ReactHelmet";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
const Layout = ({ title, header, children, searchText, setSearchText }) => {
  return (
    <div>
      <ReactHelmet title={title} />
      <SideDrawer
        header={header}
        searchText={searchText}
        setSearchText={setSearchText}
        children={children}
      />
    </div>
  );
};

export default Layout;
