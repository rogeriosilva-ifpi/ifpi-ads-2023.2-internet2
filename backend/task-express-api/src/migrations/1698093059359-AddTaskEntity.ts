import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskEntity1698093059359 implements MigrationInterface {
    name = 'AddTaskEntity1698093059359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "done" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
