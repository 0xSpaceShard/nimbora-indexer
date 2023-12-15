import { Resolver } from "@nestjs/graphql";
import { CheckpointService } from "checkpoint/checkpoint.service";



@Resolver('Withdraw')
export class WithdrawResolver {
    constructor(private checkpointService: CheckpointService) {}

    Query() {
        return {
            withdraw: async (parent, args, context, info) => {
                return await this.checkpointService.findOne(args.id);
            },
            withdraws: async (parent, args, context, info) => {
                return await this.checkpointService.findAll();
            }
        }
    }
}