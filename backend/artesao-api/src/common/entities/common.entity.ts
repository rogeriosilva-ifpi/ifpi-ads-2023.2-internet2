import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class CommonData {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
