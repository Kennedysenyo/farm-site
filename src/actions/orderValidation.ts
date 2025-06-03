"use server";

import { momoPay } from "@/lib/paystack";

type FormErrorsType = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
  momoNumber?: string;
  product?: string;
  quantity?: string;
  priceTotal?: string;
};

export type OrderFormState = {
  errors: FormErrorsType;
  success: boolean;
  errorMessage: string | null;
};

export const validateOrderForm = async (
  prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> => {
  const customerName = (formData.get("customerName") as string).trim();
  const customerEmail = (formData.get("customerEmail") as string).trim();
  const customerPhone = (formData.get("customerPhone") as string).trim();
  const deliveryAddress = (formData.get("deliveryAddress") as string).trim();
  const paymentMethod = (formData.get("paymentMethod") as string).trim();
  const momoNumber = (formData.get("momo-number") as string).trim();
  const provider = (formData.get("provider") as string).trim();
  const product = (formData.get("product") as string).trim();
  const quantity = formData.get("quantity") as string;
  const shipping = formData.get("shipping") as string;
  const priceTotal = formData.get("priceTotal") as string;

  const errors: FormErrorsType = {};

  if (!customerName) errors.customerName = "Customer name reqired";
  if (!customerEmail) errors.customerEmail = "Customer email reqired";
  if (!customerPhone) errors.customerPhone = "Customer phone reqired";
  if (!deliveryAddress) errors.deliveryAddress = "Delivery Address required";
  if (!paymentMethod) errors.paymentMethod = "Payment method required";
  if (!momoNumber) errors.momoNumber = "Momo number required";

  if (Object.keys(errors).length > 0)
    return { errors, success: false, errorMessage: null };
  console.log(
    customerName,
    "/n",
    customerEmail,
    "/n",
    customerPhone,
    "/n",
    deliveryAddress,
    "/n",
    paymentMethod,
    "/n",
    provider,
    "/n",
    momoNumber,
    "/n",
    product,
    "/n",
    quantity,
    "/n",
    shipping,
    "/n",
    priceTotal,
  );

  // Call paystack with momo number
  const referenceNumber = await momoPay(
    customerEmail,
    Number(priceTotal),
    Number(momoNumber),
    provider,
  );
  console.log(referenceNumber);

  return { errors: {}, success: true, errorMessage: null };
};
