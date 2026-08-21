import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateTripDetail = mutation({
    args: {
        tripId: v.string(),
        uid: v.id('userTable'),
        tripDetail: v.any(),

    },
    handler: async (ctx, args) => {
        await ctx.db.insert('TripDetailTable', {
            tripDetail: args.tripDetail,
            tripId: args.tripId,
            uid: args.uid
        });

    }
})

export const GetUserTrips = query({
    args: {
        uid: v.id('userTable'),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('TripDetailTable')
            .filter((q) => q.eq(q.field('uid'), args.uid))
            .collect();
    }
})

export const GetTripById = query({
    args: {
        uid: v.id('userTable'),
        tripid: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('TripDetailTable')
            .filter((q) => q.and(
                q.eq(q.field('uid'), args.uid),
                q.eq(q.field('tripId'), args.tripid)
            ))
            .first();
    }
})