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
exports.SenateCommitteeModel = exports.SenateCommittee = void 0;
const type_graphql_1 = require("type-graphql");
const types_1 = require("../shared/types");
const typegoose_1 = require("@typegoose/typegoose");
var SenateCommittees;
(function (SenateCommittees) {
    SenateCommittees["SENATE_FOREIGN_RELATIONS_COMMITTEE"] = "sfrc";
    SenateCommittees["SENATE_ARMED_SERVICES_COMMITTEE"] = "sasc";
    SenateCommittees["SENATE_AGRICULTURE_COMMITTEE"] = "sagc";
    SenateCommittees["SENATE_APPROPRIATIONS_COMMITTEE"] = "sapc";
    SenateCommittees["SENATE_BANKING_COMMITTEE"] = "sbnk";
    SenateCommittees["SENATE_BUDGET_COMMITTEE"] = "sbdg";
    SenateCommittees["SENATE_TRASPORTATION_COMMITTEE"] = "sstr";
    SenateCommittees["SENATE_NATURAL_RESOURCES_COMMITTEE"] = "snat";
    SenateCommittees["SENATE_ENVIRONMENT_AND_PUBLIC_WORKS_COMMITTEE"] = "senv";
    SenateCommittees["SENATE_FINANCE_COMMITTEE"] = "sfin";
    SenateCommittees["SENATE_HEALTH_EDUCATION_AND_LABOR_COMMITTEE"] = "shlp";
    SenateCommittees["SENATE_HOMELAND_SECURITY_COMMITTEE"] = "shsc";
    SenateCommittees["SENATE_INDIAN_AFFAIRS_COMMITTEE"] = "sind";
    SenateCommittees["SENATE_JUDICIARY_COMMITTEE"] = "sjud";
    SenateCommittees["SENATE_RULES_COMMITTEE"] = "srle";
    SenateCommittees["SENATE_ETHICS_COMMITTEE"] = "seth";
    SenateCommittees["SENATE_INTELLIGENCE_COMMITTEE"] = "ssci";
    SenateCommittees["SENATE_SMALL_BUSINESS_COMMITEE"] = "ssbs";
    SenateCommittees["SENATE_VETERANS_AFFAIRS_COMMITTEE"] = "svac";
})(SenateCommittees || (SenateCommittees = {}));
let SenateCommittee = class SenateCommittee extends types_1.Committee {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, enum: SenateCommittees }),
    __metadata("design:type", String)
], SenateCommittee.prototype, "committee", void 0);
SenateCommittee = __decorate([
    type_graphql_1.ObjectType()
], SenateCommittee);
exports.SenateCommittee = SenateCommittee;
exports.SenateCommitteeModel = typegoose_1.getModelForClass(SenateCommittee);
