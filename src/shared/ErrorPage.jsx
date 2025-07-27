import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useRouteError } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
    <Helmet>
      <title>Error</title>
    </Helmet>
    <div className="flex flex-col justify-center items-center min-h-screen  px-4">
      
      <div className="max-w-md mb-6">
        <lottie-player
          src="https://assets10.lottiefiles.com/packages/lf20_JkVxPf.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>

      <h1 className="text-6xl font-extrabold text-green-600 mb-2">
        {error?.status || 404}
      </h1>
      <p className="text-2xl text-green-600 font-semibold mb-4">
        {error?.error?.message || 'Oops! Something went wrong.'}
      </p>

      {/*  Go Home Button */}
      <Link to="/">
        <button className="btn bg-green-600">Go To Home</button>
      </Link>
    </div>
    </>
  );
};

export default ErrorPage;





