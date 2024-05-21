import { toInputObjectType } from "graphql-compose";
import { Org, OrgTC, LocalTC, CustomerTC } from './schemas';

type ResolverInput = {
    _id: string,
    local: typeof InputITC
}

type CustomerInput = {
    orgId: string,
    localId: string,
    user: typeof CustomerITC
}

const InputITC = toInputObjectType(LocalTC);
const CustomerITC = toInputObjectType(CustomerTC);

export const orgMutation = {
    orgCreateOne: OrgTC.mongooseResolvers.createOne(),
    orgUpdateById: OrgTC.mongooseResolvers.updateById(),
    orgUpdateOne: OrgTC.mongooseResolvers.updateOne(),
    orgUpdateMany: OrgTC.mongooseResolvers.updateMany(),
    orgRemoveById: OrgTC.mongooseResolvers.removeById(),
    orgRemoveOne: OrgTC.mongooseResolvers.removeOne(),
    orgAddLocal: {
        type: OrgTC,
        args: {
            _id: 'String',
            local: InputITC
        },
        resolve: async (_: any, args: ResolverInput) => {
            const org = await Org.updateOne(
              { _id: args._id },
              { $push: { locals: args.local } }
            );
            if (!org) return null
            return Org.findOne({ _id: args._id })
        }
    },
    orgUpdateLocal: {
        type: OrgTC,
        args: {
            _id: 'String',
            localId: 'String',
            local: InputITC
        },
        resolve: async (_: any, args: ResolverInput & {localId: string}) => {
            const org = await Org.updateOne(
              {
                  _id: args._id,
                  "locals._id": args.localId
              },
              {
                  $set: {
                      "locals.$": args.local
                  }
              }
            );
            if (!org) return null;
            return Org.findOne({ _id: args._id });
        }
    },
    orgDeleteLocal: {
        type: LocalTC,
        args: {
            orgId: 'String',
            localId: 'String'
        },
        resolve: async (_: any, args: { orgId: String, localId: String}) => {
            const org = await Org.updateOne(
              { _id: args.orgId },
              { $pull: {
                        "locations": {
                            _id: args.localId
                        }
                  }}
            );
            if (!org) return null;
            return Org.findOne({ _id: args.orgId });
        }
    },
    orgAddUser: {
        type: LocalTC,
        args: {
            orgId: 'String',
            localId: 'String',
            user: CustomerITC
        },
        resolve: async(_: any, args: CustomerInput) => {
            const org = await Org.updateOne(
              {
                  _id: args.orgId,
                  "locals._id": args.localId
              },
              {
                  $push: {
                      "locals.$.linkedUsers": args.user
                  }
              }
            )
            if (!org) return null;
            return Org.findOne({ _id: args.orgId });
        }
    },
    orgStampClient: {
        type: LocalTC,
        args: {
            orgId: 'String',
            localId: 'String',
            userId: 'String'
        },
        resolve: async (_: any, args: { orgId: string, localId: string, userId: string}) => {
            const org = await Org.updateOne(
              {
                  _id: args.orgId,
                  "locals._id": args.localId,
                  "locals._id.linkedUsers._id": args.userId
              },
              {
                  $set: {
                      "locals.$.linkedUsers.$": {
                          firstName: "joachin",
                          lastName: "elo"
                      }
                  }
              }
            )
        }
    }

}
