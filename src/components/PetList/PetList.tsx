import { Pet } from '../../model/pet';
import './petList.css';
import placeholder from '../../img/pet.png';

export interface IPetListProps {
    myPets: Pet[];
    className?: string;
}

export function PetList({ myPets, className }: IPetListProps) {
    return <div className={`myapp-pets-list ${className ?? ""}`}>
        {myPets.map(pet =>
            <figure>
                {pet.name && <figcaption>{pet.name}</figcaption>}
                <img src={pet.imageUrl || placeholder} alt={pet.name} />
            </figure>
        )}
    </div>
}