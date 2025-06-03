import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const momoPay = async (
  email: string,
  amount: number,
  phone: number,
  provider: string,
) => {
  try {
    const response = await fetch("/api.paystack.co/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
      },
      body: JSON.stringify({
        amount,
        email,
        currency: "GHS",
        mobile_money: {
          phone,
          provider,
        },
      }),
    });
    const data = await response.json();
    if (!data) throw new Error("Fialed to initiate charge on user");

    return data.data.reference;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return error.message;
    }
    return error;
  }
};
