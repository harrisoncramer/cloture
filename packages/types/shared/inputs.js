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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitteeInput = void 0;
const type_graphql_1 = require("type-graphql");
// Used to query for committees
let CommitteeInput = class CommitteeInput {
};
__decorate([
    type_graphql_1.Field((type) => [String], { nullable: true }),
    __metadata("design:type", Array)
], CommitteeInput.prototype, "committee", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CommitteeInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CommitteeInput.prototype, "link", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CommitteeInput.prototype, "minDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CommitteeInput.prototype, "maxDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CommitteeInput.prototype, "minTime", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CommitteeInput.prototype, "maxTime", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CommitteeInput.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CommitteeInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: false }),
    __metadata("design:type", Number)
], CommitteeInput.prototype, "skip", void 0);
__decorate([
    type_graphql_1.Field({ nullable: false }),
    __metadata("design:type", Number)
], CommitteeInput.prototype, "limit", void 0);
CommitteeInput = __decorate([
    type_graphql_1.InputType()
], CommitteeInput);
exports.CommitteeInput = CommitteeInput;
