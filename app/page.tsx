"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setName } from "@/lib/redux/slices/userSlice";
import RegisterForm from "./components/shared/form/forms/auth/registerForm";

export default function HomePage() {
  const name = useAppSelector((state : any) => state.user.name);
  const dispatch = useAppDispatch();

  return (
    <div>
      <RegisterForm/>
    </div>
  );
}
