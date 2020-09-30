"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Committee = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const moment_1 = __importDefault(require("moment"));
const validFormats = {
    date: [
        "MMM D, YYYY",
        "MM.DD.YY",
        "MMM D YYYY",
        "MMM D",
        "MMM DD YYYY",
        "MMMM DD, YYYY",
        "MMMM D, YYYY",
        "MM/DD/YYYY",
        "MM/DD/YY",
        "M/DD/YY",
        "M/D/YY",
        "ddd, MM/DD/YYYY",
        "dddd, MMMM DD, YYYY",
        "dddd, MMMM D, YYYY",
    ],
    time: [
        "LT",
        "hh:mm A",
        "h:mm A",
        "hh:mm a",
        "h:mm a",
        "hh:mmA",
        "h:mmA",
        "hh:mma",
        "h:mma",
        "hh:mm",
        "h:mm [p.m.]",
        "h:mm [a.m.]",
        "h:mm [A.M.]",
        "h:mm [P.M.]",
    ],
};
const handleSetTime = (time) => {
    const validFormat = validFormats.time.find((format) => moment_1.default(time, format, true).isValid());
    return moment_1.default(time, validFormat).toDate();
};
const handleSetDate = (date) => {
    const validFormat = validFormats.date.find((format) => moment_1.default(date, format, true).isValid());
    return moment_1.default(date, validFormat).toDate();
};
let Committee = class Committee {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Committee.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Committee.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({
        required: true,
        get: (date) => date,
        set: (date) => handleSetDate(date),
    }),
    __metadata("design:type", Date)
], Committee.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop({ get: (date) => date, set: (time) => handleSetTime(time) }),
    __metadata("design:type", Date)
], Committee.prototype, "time", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Committee.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Committee.prototype, "location", void 0);
Committee = __decorate([
    type_graphql_1.ObjectType({ description: "The base class for Senate and House committees." }),
    typegoose_1.pre("save", function (next) {
        const document = this;
        document.wasNew = document.isNew; // Pass "newness" as new property for post-save
        if (!document.isNew) {
            const modifiedPaths = document.modifiedPaths();
            if (modifiedPaths.length > 0) {
                modifiedPaths.forEach((path) => {
                    console.log(`${document.id} ${path} ––> ${JSON.stringify(document[path])}`);
                });
            }
        }
        next();
    }),
    typegoose_1.post("save", function (doc, next) {
        if (doc.wasNew) {
            console.log(`Document saved with id ${doc._id}`);
        }
    })
], Committee);
exports.Committee = Committee;
