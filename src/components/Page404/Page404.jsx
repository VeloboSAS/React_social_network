import React from "react";
import s from './Page404.module.css';
import notFound from '../../images/error-page-404.jpg';
import {Link} from "react-router-dom";

const Page404 = () => {
  return (
      <div className={s.blockWrapper}>
        <img src={notFound} alt="not found" className={s.image}/>
        <h1 className={s.title}>Page is not found</h1>
        <Link to={'/'} className={s.mainpageLink}>Go to main page</Link>
      </div>
  );
}

export default Page404;