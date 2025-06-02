import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const signature = request.headers.get("x-paystack-signature");
    if (!signature) return NextResponse.json("Unauthorized", { status: 401 });

    const rawBody = await request.arrayBuffer();
    const generatedSignature = createHmac(
      "sha512",
      process.env.PAYSTACK_SECRET_KEY!,
    )
      .update(Buffer.from(rawBody))
      .digest("hex");
    console.log(generatedSignature);

    const generatedSignatureBuffer = Buffer.from(generatedSignature, "hex");
    const signatureBuffer = Buffer.from(signature, "hex");
    if (generatedSignatureBuffer.length !== signatureBuffer.length)
      return NextResponse.json("Signature length mismacth", { status: 400 });

    const isValid = timingSafeEqual(generatedSignatureBuffer, signatureBuffer);
    if (!isValid)
      return NextResponse.json("Invalid Signature", { status: 400 });

    const body = await JSON.parse(Buffer.from(rawBody).toString("utf-8"));
    const { event, data } = body;
    console.log(event, data);

    return NextResponse.json("Ok", { status: 200 });
  } catch (error) {
    return NextResponse.json("Invalid JSON", { status: 400 });
  }
};
