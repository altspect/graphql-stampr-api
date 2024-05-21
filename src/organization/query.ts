import { OrgTC } from "./schemas";

export const orgQuery = {
  orgById: OrgTC.mongooseResolvers.findById(),
  orgByIds: OrgTC.mongooseResolvers.findByIds(),
  orgOne: OrgTC.mongooseResolvers.findOne(),
  orgMany: OrgTC.mongooseResolvers.findMany(),
  orgCount: OrgTC.mongooseResolvers.count(),
  orgConnection: OrgTC.mongooseResolvers.connection(),
  orgPagination: OrgTC.mongooseResolvers.pagination(),
}
