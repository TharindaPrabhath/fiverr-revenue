import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import { AbstractEntity } from '../../../config/database/abstract.entity';
@Entity()
export class RevenueStream extends AbstractEntity<RevenueStream> {
   
    @Column()
    name: string;

    @Column()
    description: string;
    
}
