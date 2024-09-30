import LoginForm from "@/components/login-form";
import Image from "next/image";
export default function Login() {
  return (
    <div className="flex h-screen items-center">
      <div className="basis-[55%] xl:basis-[48%] flex-none h-full relative rounded-br-[20%]  lg:rounded-br-[25%] overflow-hidden hidden md:block">
        <Image
          src="/login-bg.jpg"
          width="852"
          height="1178"
          alt="login background"
          className="h-full w-full object-cover"
        />

        {/* <p className="absolute top-[45%] mx-auto text-center inset-0 z-10 ">
          hello there
        </p> */}

        <Image
          src="/Group174.svg"
          className="absolute top-[40%] mx-auto text-center inset-0 z-10 "
          width="348"
          height="89"
          alt="pms logo"
        />

        {/* <Image src="/Group174.svg" alt="pms logo" width={30} height={30} /> */}

        {/* <ul className="absolute bottom-4 text-white flex flex-wrap items-center gap-x-8 xl:gap-x-10 gap-y-2 pl-[8%] pr-[20%] w-full">
          <li>Martketplace</li>
          <li>License</li>
          <li>Terms of Use</li>
          <li>Blog</li>
        </ul> */}
      </div>

      <div className="mx-auto  max-w-[410px] w-full px-5">
        <h2 className="text-4xl text-dark-blue font-bold">Log in</h2>
        <p className="text-[#A3AED0] mb-8">
          Enter your email and password to log in!
        </p>

        <LoginForm />

        {/* <form action="" >
          <div className="mb-4">
            <Label
              htmlFor="username"
              className="text-dark-blue font-medium text-sm"
            >
              Username<span className="text-light-blue">*</span>
            </Label>
            <Input
              id="username"
              type="text"
              className="rounded-2xl w-full mt-2 h-12"
              required
            />
          </div>
          <div className="mb-12">
            <Label
              htmlFor="password"
              className="text-dark-blue font-medium text-sm"
            >
              Password<span className="text-light-blue">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              className="rounded-2xl w-full  mt-2 h-12"
              required
            />
          </div>

          <Button type="submit" className="w-full rounded-2xl h-12">
            Log in
          </Button>
        </form> */}
      </div>
    </div>
  );
}
