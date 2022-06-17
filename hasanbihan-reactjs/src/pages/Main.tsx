import React from 'react'; import {
    Routes,
    Route,
} from "react-router-dom";
const Header = React.lazy(() => import('./Header'));
const Home = React.lazy(() => import('./Home'));
const Create = React.lazy(() => import('./Create'));
const Detail = React.lazy(() => import('./Detail'));

interface IProps { }

const Main: React.FC<IProps> = (props) => {

    return (
        <>
            <div className="bg-indigo-600 shadow-lg">
                <Header />
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/product" >
                    <Route path=":productId" element={<Detail />} />
                </Route>
            </Routes>
        </>

    )
}

export default Main