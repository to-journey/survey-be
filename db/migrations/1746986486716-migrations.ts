import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746986486716 implements MigrationInterface {
    name = 'Migrations1746986486716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surveys" ADD "participants" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "problems" ADD "number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "problems" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "surveys" DROP COLUMN "participants"`);
    }

}
