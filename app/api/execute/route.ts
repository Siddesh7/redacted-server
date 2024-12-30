import connectToDatabase from "@/lib/mongoose";
import AssertionRequest from "@/models/requests";
import {NextRequest, NextResponse} from "next/server";
import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";

import {neoxT4} from "viem/chains";
export async function POST(req: NextRequest) {
  const {assertionId, verdict} = await req.json();

  if (!assertionId) {
    return NextResponse.json({status: 400, message: "assertionId is required"});
  }

  await connectToDatabase();
  const assertion = await AssertionRequest.findById(assertionId);

  if (!assertion) {
    return NextResponse.json({status: 404, message: "assertion not found"});
  }

  const client = createWalletClient({
    chain: neoxT4,
    transport: http(),
    account: privateKeyToAccount(
      (process.env.PRIVATE_KEY as `0x${string}`) || ""
    ),
  });

  try {
    const hash = await client.writeContract({
      address: assertion.contractAddress,
      abi: JSON.parse(assertion.abi),
      functionName: assertion.functionName,
      args: [Boolean(verdict)],
    });

    console.log(`Transaction hash: ${hash}`);

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({status: 500, message: error});
  }
}
