import { Route, Routes } from "react-router";
import Map1 from "./pages/Map1";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Designs from "./pages/Designs";
import FileUpload from "./pages/FileUpload";
import FetchingData from "./pages/graphQL/FetchingData";
import CreditCard from "./pages/finances/CreditCard";
import Animation1 from "./components/animations/gsap/Animation1";
import AddProducts from "./components/forms/AddProducts";
import Notifications from "./pages/Notifications";

gsap.registerPlugin( useGSAP );
function App() {

  return (
    <Routes>

      <Route path="/" element={ <Home /> } />
      <Route path="/map" element={ <ErrorBoundary>
        <Map1 />
      </ErrorBoundary> } />
      <Route path="/designs" element={ <Designs /> } />
      <Route path="/file/upload" element={ <FileUpload /> } />
      <Route path="/graphql/fetching" element={ <FetchingData /> } />
      <Route path="/finances/credit_card" element={ <CreditCard /> } />
      <Route path="animations">
        <Route path="gsap">
          <Route path="1" element={ <Animation1 /> } />
        </Route>
      </Route>
      <Route path="/notifications" element={ <Notifications /> } />

      <Route path="forms">
        <Route path="add_products" element={ <AddProducts /> } />
      </Route>
      <Route path="*" element={ <div>404</div> } />




    </Routes>
  );
}

export default App;
