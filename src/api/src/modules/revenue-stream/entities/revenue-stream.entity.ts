import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class RevenueStream {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
}
