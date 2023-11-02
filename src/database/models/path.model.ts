import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Team from "./team.model";

@Table
export default class Path extends Model {
  @ForeignKey(() => Team)
  @Column
  teamNumber: number;

  @BelongsTo(() => Team)
  team: Team;

  @Column
  route: string; //stringified number[]
}