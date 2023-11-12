import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnTagsTask1698093524982 implements MigrationInterface {
    name = 'AddColumnTagsTask1698093524982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "tags" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "tags"`);
    }

}
