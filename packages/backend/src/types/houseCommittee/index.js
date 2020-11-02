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
exports.HouseCommitteeModel = exports.HouseCommittee = void 0;
const type_graphql_1 = require("type-graphql");
const types_1 = require("../shared/types");
const typegoose_1 = require("@typegoose/typegoose");
var HouseCommittees;
(function (HouseCommittees) {
    HouseCommittees["HOUSE_ARMED_SERVICES_COMMITTEE"] = "hasc";
    HouseCommittees["HOUSE_FOREIGN_RELATIONS_COMMITTEE"] = "hfac";
    HouseCommittees["HOUSE_JUDICIARY_COMMITTEE"] = "hjud";
    HouseCommittees["HOUSE_RULES_COMMITTEE"] = "hrle";
    HouseCommittees["HOUSE_VETERANS_AFFAIRS_COMMITTEE"] = "hvac";
    HouseCommittees["HOUSE_HOMELAND_SECURITY_COMMITTEE"] = "hhsc";
    HouseCommittees["HOUSE_AGRICULTURE_COMMITTEE"] = "hagc";
    HouseCommittees["HOUSE_APPROPRIATIONS_COMMITTEE"] = "hapc";
    HouseCommittees["HOUSE_BUDGET_COMMITTEE"] = "hbuc";
    HouseCommittees["HOUSE_EDUCATION_AND_LABOR_COMMITTEE"] = "help";
    HouseCommittees["HOUSE_ENERGY_AND_COMMERCE_COMMITTEE"] = "nrgy";
    HouseCommittees["HOUSE_FINANCIAL_SERVICES_COMMITTEE"] = "fisv";
    HouseCommittees["HOUSE_ADMINISTRATION_COMMITTEE"] = "admn";
    HouseCommittees["HOUSE_NATURAL_RESOURCES_COMMITTEE"] = "ntty";
    HouseCommittees["HOUSE_OVERSIGHT_AND_REFORM_COMMITTEE"] = "ovst";
    HouseCommittees["HOUSE_SCIENCE_SPACE_AND_TECHNOLOGY_COMMITTEE"] = "scnc";
    HouseCommittees["HOUSE_SMALL_BUSINESS_COMMMITTEE"] = "smbs";
    HouseCommittees["HOUSE_TRANSPORTATION_AND_INFRASTRUCTURE_COMMITTEE"] = "trns";
    HouseCommittees["HOUSE_WAYS_AND_MEANS_COMMITTEE"] = "wymn";
    HouseCommittees["HOUSE_CLIMATE_COMMITTEE"] = "clmt";
})(HouseCommittees || (HouseCommittees = {}));
let HouseCommittee = class HouseCommittee extends types_1.Committee {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, enum: HouseCommittees }),
    __metadata("design:type", String)
], HouseCommittee.prototype, "committee", void 0);
HouseCommittee = __decorate([
    type_graphql_1.ObjectType()
], HouseCommittee);
exports.HouseCommittee = HouseCommittee;
exports.HouseCommitteeModel = typegoose_1.getModelForClass(HouseCommittee);
