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
    await signIn("credentials", rawFormData);
  } catch (error: any) {
    console.log(error)
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
