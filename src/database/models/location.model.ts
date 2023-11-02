import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export default class Location extends Model {
  @PrimaryKey
  @Column
  number: number;

  @Column
  name: string;

  @Column
  riddle: string;

  @Column
  answer: string;
}