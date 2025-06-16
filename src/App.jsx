import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Write from './pages/Write';
import Post from './pages/Post';

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/post" component={Post} />
                <Route path="/write" component={Write} />
            </Routes>
        </Router>
    </>
  )
}

export default App
