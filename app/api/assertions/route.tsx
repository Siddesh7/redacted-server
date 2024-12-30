import connectToDatabase from "@/lib/mongoose";
import AssertionRequest from "@/models/requests";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      assertion,
      deadline,
      settlementDeadline,
      creator,
      contractAddress,
      functionName,

      abi,
      chainId,
    } = await req.json();
    await connectToDatabase();
    const assertionRequest = new AssertionRequest({
      assertion,
      deadline,
      settlementDeadline,
      creator,
      contractAddress,
      functionName,

      abi,
      chainId,
    });
    await assertionRequest.save();
    return NextResponse.json({assertionRequest});
  } catch (error) {
    return NextResponse.json({status: 500, message: error});
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await connectToDatabase();
    if (id) {
      const assertionRequest = await AssertionRequest.findById(id);
      return NextResponse.json({assertionRequest});
    }
    const assertionRequests = await AssertionRequest.find();
    return NextResponse.json({assertionRequests});
  } catch (error) {
    return NextResponse.json({status: 500, message: error});
  }
}
