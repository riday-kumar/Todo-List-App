import React from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Guest = () => {
  const { googleLogIn } = useAuth();

  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        toast.success("Log in Successful");
        const newUser = { email: result.user.email };
        // const userEmail = result.
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center space-y-10 bg-[#f8f9ff] py-10">
      <span className="px-5 py-1 rounded-full bg-[#eef2ff] text-[18px] text-primary font-medium">
        Optimize your workflow
      </span>
      <div className="space-y-5 mt-10">
        <div className="font-extrabold text-5xl">
          <h1 className="text-black mb-5">Master Your Day,</h1>
          <h1 className="text-primary italic">One Task at a Time.</h1>
        </div>
        <p className="text-2xl font-medium text-gray-500">
          Focus on what matters. We'll handle the rest. Transform your
          productivity with our intelligent engine designed for elite
          performers.
        </p>
      </div>
      <div className="bg-[#213145] py-20 px-5 space-y-5 rounded-3xl">
        <h1 className="text-[#eaf1ff] font-extrabold text-5xl">
          Ready to achieve your peak ?
        </h1>
        <p className="text-gray-200 text-2xl font-medium">
          join 50,000+ professionals who have transformed their work-life
          balance with FocusFlow
        </p>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-lg btn-primary is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Sign In With Google"
        >
          Get Started for Free
        </button>
      </div>
    </div>
  );
};

export default Guest;
