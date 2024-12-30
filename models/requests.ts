import {model, models, Schema} from "mongoose";

export interface assertionRequest {
  assertion: string;
  deadline: string;
  settlementDeadline: string;
  creator: string;
  contractAddress: string;
  functionName: string;

  abi: any;
  chainId: number;
}

const assertionRequestSchema = new Schema<assertionRequest>(
  {
    assertion: {type: String, required: true},
    deadline: {type: String, required: true},
    settlementDeadline: {type: String, required: true},
    creator: {type: String, required: true},
    contractAddress: {type: String, required: true},
    functionName: {type: String, required: true},

    abi: {type: String, required: true},
    chainId: {type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

const AssertionRequest =
  models.AssertionRequest ||
  model<assertionRequest>("AssertionRequest", assertionRequestSchema);

export default AssertionRequest;
