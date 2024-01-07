import logo from "./logo.svg";
import "./App.css";
import AddEdit from "./components/Pages/AddEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCrop from "react-image-crop-component";
import "react-image-crop-component/style.css";
function App() {
  return (
    <div>
      <AddEdit></AddEdit>
    </div>
  );
}

export default App;
