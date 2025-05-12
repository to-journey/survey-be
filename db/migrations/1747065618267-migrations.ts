import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747065618267 implements MigrationInterface {
    name = 'Migrations1747065618267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "attributions" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "attributions"`);
    }

}
