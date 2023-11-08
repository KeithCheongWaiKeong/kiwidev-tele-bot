import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";

@Table
export default class Team extends Model {
  @PrimaryKey
  @Column
  number: number;

  @Column
  name: string;

  @Column
  code: string;

  @Column
  currentPath: number = 0;

  @Column
  isOnRiddle: boolean = true;
}
