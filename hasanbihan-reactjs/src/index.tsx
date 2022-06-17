import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import Main from './pages/Main';

import Spinner from "./components/Spinner"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Suspense fallback={<Spinner/>}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.Suspense>
);
