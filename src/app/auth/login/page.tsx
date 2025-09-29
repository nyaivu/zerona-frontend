import TextInput from "@/components/TextInput";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/app/auth/actions";

const SignInPage: NextPage = () => {
  return (
    <div className="md:grid grid-cols-2">
      <form className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 md:px-32 bg-background rounded-r-2xl overflow-hidden">
        <h1 className="font-bold text-4xl">Daftar Akun</h1>
        <TextInput
          name="email"
          label="Email"
          placeholder="Masukkan email anda..."
        />
        <TextInput
          isPassword
          name="password"
          label="Password"
          placeholder="Masukkan password anda..."
        />

        <div className="w-full flex flex-col items-center gap-4">
          {/* Submit button */}
          <button
            className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary"
            formAction={login}
          >
            Daftar sekarang
          </button>

          {/* Redirect to login */}
          <p>
            Belum memiliki akun?{" "}
            <Link href="/auth/register" className="text-primary underline">
              Daftar sekarang
            </Link>
          </p>
          <div className="w-full flex flex-row gap-2 items-center">
            <span className="w-full h-[1px] bg-gray-400" />
            <p className="text-gray-400">Or</p>
            <span className="w-full h-[1px] bg-gray-400" />
          </div>
          {/* Google sign up button */}
          <button className="cursor-pointer flex flex-row justify-center items-center gap-2  bg-white w-full text-foreground px-4 py-2 rounded-md outline-2 -outline-offset-2 outline-gray-400 transition-all hover:bg-gray-100">
            <Image
              src="/assets/google-g-logo.svg"
              alt="Google G Logo"
              width={24}
              height={24}
            />
            Masuk dengan Google
          </button>
        </div>
      </form>

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
