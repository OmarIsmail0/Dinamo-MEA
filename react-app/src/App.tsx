import { lazy, Suspense } from "react";
import "./App.css";

const PostTable = lazy(() => import("./components/PostTable"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostTable />
    </Suspense>
  );
}

export default App;
