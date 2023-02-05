import React, { useEffect } from "react";

import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const { signin, user } = useAuth();

  const handleSignIn = () => {
    signin();
  };

  return (
    <>
      {user && user.uid ? (
        <Loading />
      ) : (
        <>
          <header className="bg-[#00A884] min-h-[220px] text-text1">
            <div className="max-w-[1000px] mx-auto w-11/12 relative">
              <div className="text-white flex items-center gap-4 py-7">
                <img
                  src="/apple-touch-icon.png"
                  alt="WhatsApp"
                  className="w-[50px] h-[50px]"
                />
                <span className="font-semibold uppercase text-sm">
                  WhatsApp Web
                </span>
              </div>
              <div className="bg-white p-16 absolute top-28 left-0 right-0 shadow-[2px_2px_16px_rgba(0_0_0_/_20%)] rounded">
                <h2 className="font-thin text-2xl md:text-3xl leading-none">
                  To use WhatsApp Sign In
                </h2>

                <div className="mt-16">
                  <div className="max-w-sm mx-auto">
                    <h3 className="text-lg md:text-xl font-thin">
                      Sign in with Google
                    </h3>

                    <div className="my-4">
                      <button
                        className="flex items-center justify-center border-2 border-text1 gap-2 py-2 px-6 cursor-pointer rounded transition duration-300 sidebar_right_icon active:bg-text1 active:text-gray1  w-80 sm:w-96"
                        onClick={handleSignIn}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_536_126)">
                            <path
                              d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                              fill="#2524D1"
                            />
                            <path
                              d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.52488 14.2901C5.27488 13.5701 5.14488 12.8001 5.14488 12.0001C5.14488 11.2001 5.28488 10.4301 5.52488 9.71012V6.62012H1.54488C0.724882 8.24012 0.254883 10.0601 0.254883 12.0001C0.254883 13.9401 0.724882 15.7601 1.54488 17.3801L5.52488 14.2901Z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                              fill="#EA4335"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_536_126">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="font-bold text-lg">Google</span>
                      </button>
                    </div>
                  </div>
                  <form></form>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-[#111B21] min-h-screen"></div>
        </>
      )}
    </>
  );
};

export default Signin;
