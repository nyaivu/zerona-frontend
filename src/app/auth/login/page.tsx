import { NextPage } from "next";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

const SignInPage: NextPage = () => {
  return (
    <div className="md:grid grid-cols-2">
      <LoginForm />

      <div className="hidden md:block w-auto h-screen -z-10 -ml-4">
        <Image
          className="w-full h-full object-cover "
          src="/assets/auth-bg.png"
          alt="Latar belakang autentikasi"
          width={754}
          height={1024}
        />
      </div>
    </div>
  );
};

export default SignInPage;
