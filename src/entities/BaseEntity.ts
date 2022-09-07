import { DbActionSource } from "../types/domain/DbActionSource";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export const DB_ACTION_SOURCES = [
  DbActionSource.SYSTEM,
  DbActionSource.WEB_CLIENT,
  DbActionSource.CHAT_BOT,
];

export abstract class BaseEntity {
  @PrimaryColumn({ name: "id", type: "uuid", generated: "uuid" })
  id: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    name: "created_by",
    type: "varchar",
    enum: DB_ACTION_SOURCES,
    default: DbActionSource.SYSTEM,
  })
  createdBy: DbActionSource;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp with time zone",
    default: new Date(),
  })
  updatedAt: Date;

  @Column({
    name: "updated_by",
    type: "varchar",
    enum: DB_ACTION_SOURCES,
    default: DbActionSource.SYSTEM,
  })
  updatedBy: DbActionSource;

  @Column({ name: "deleted", type: "boolean", default: false })
  deleted: boolean;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: "deleted_by",
    type: "varchar",
    enum: DB_ACTION_SOURCES,
    default: DbActionSource.SYSTEM,
  })
  deletedBy: DbActionSource;

  abstract toJSON();
}
