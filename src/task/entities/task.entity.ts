import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: false })
    completed: boolean

    @CreateDateColumn({
        name: "created_at",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

    @UpdateDateColumn({
        name: "created_at",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    })
    updated_at: Date;
}
