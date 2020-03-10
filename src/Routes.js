import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./components/About/About";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Blog from "./components/Blog/Blog";
import BlogEdit from "./components/Blog/BlogEdit";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import ContactMsg from "./components/Contact/ContactMsg";
import Landing from "./components/Landing/Landing";
import Newsletter from "./components/Newsletter/Newsletter";
import Shop from "./components/Shop/Shop";
import Product from "./components/Products/Product";
import MembersArea from "./components/MembersArea/MembersArea";
import Charts from "./components/MembersArea/Charts/Charts";
import ChatWithMembers from "./components/MembersArea/ChatWithMembers/ChatWithMembers";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/newsletter" component={Newsletter} />
    <Route path="/shop" component={Shop} />
    <Route path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
    <Route path="/cart" component={Cart} />
    <Route path="/auth" component={Auth} />
    <Route path="/admin" component={Admin} />
    <Route path="/blog/:id" component={Blog} />
    <Route path="/blogEdit/:id" component={BlogEdit} />
    <Route path="/contact/:id" component={ContactMsg} />
    <Route path="/product/:id" component={Product} />
    <Route path="/member">
      <MembersArea />
      <Route
        exact
        path="/member/charts"
        render={() => {
          return <Charts />;
        }}
      />
      <Route
        exact
        path="/member/chat"
        render={() => {
          return <ChatWithMembers />;
        }}
      />
    </Route>
  </Switch>
);
