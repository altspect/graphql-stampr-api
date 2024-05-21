import { UserTC } from './schemas';

export const userMutation = {
        userCreateOne: UserTC.mongooseResolvers.createOne(),
        userUpdateById: UserTC.mongooseResolvers.updateById(),
        userUpdateOne: UserTC.mongooseResolvers.updateOne(),
        userUpdateMany: UserTC.mongooseResolvers.updateMany(),
        userRemoveById: UserTC.mongooseResolvers.removeById(),
        userRemoveOne: UserTC.mongooseResolvers.removeOne(),
};
