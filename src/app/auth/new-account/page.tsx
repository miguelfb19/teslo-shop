import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen w-1/2 pt-20 sm:pt-32">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <RegisterForm/>
    </div>
  );
}
