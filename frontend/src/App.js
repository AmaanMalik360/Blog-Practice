import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./routes/NotFound";
import Navbar from "./components/common/navbar";
import Signup from "./pages/user/signup";
import Signin from "./pages/user/signin";
import BlogList from "./pages/blogs/blog-list";
import Create from "./pages/blogs/create";
import BlogDetails from "./pages/blogs/blog-details";
import BlogUpdate from "./pages/blogs/update";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<BlogList />} />
              <Route path="/create" element={<Create />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/update/:id" element={<BlogUpdate />} />
            </Route>
            
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
