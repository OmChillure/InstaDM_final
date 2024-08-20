import { error } from "console";
import { signIn, signOut } from "next-auth/react";

export const logout = async () => {
  await signOut();
};

export const loginWithCreds = async (formData: {email:string, password:string}) => {
  const rawFormData = {
    email: formData?.email,
    password: formData?.password,
    redirect: false,
    callbackUrl:"/dashboard"
  };

  try {
    const response = await signIn("credentials", rawFormData);

    if(!response?.ok){
      throw new Error(response?.error ?? "")
    }

  } catch (error: any) {
    if (error) {
      switch (error.message) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
