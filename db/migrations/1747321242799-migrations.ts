import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747321242799 implements MigrationInterface {
    name = 'Migrations1747321242799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "point" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastLogin" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "point"`);
    }

}
