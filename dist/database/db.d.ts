import mongoose from "mongoose";
export declare function connectDB(): Promise<void>;
export declare const User: mongoose.Model<{
    name: string;
    token: string;
    age?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    token: string;
    age?: number | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    token: string;
    age?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    token: string;
    age?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    token: string;
    age?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    token: string;
    age?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map