import React, { useRef } from 'react';
import { Pet } from '../../model/pet';
import { PetSelector } from './PetSelector/PetSelector';
import './petForm.css';

export interface IPetFormProps {
  addPet: (value: Pet) => void;
  className?: string;
}
export function PetForm({ addPet, className }: IPetFormProps) {
  const pet = useRef<"cat" | "dog">("cat");
  const nameRef = useRef<HTMLInputElement>(null);

  const onAddClick = async () => {

    const api = `https://api.the${pet.current}api.com/v1/images/search?size=small&limit=1`;

    const imageUrl = await fetch(api)
      .then(response => response.json())
      .then(data => data[0]?.url)
      .catch(() => undefined);

    addPet({
      name: nameRef.current?.value ?? "",
      type: pet.current,
      imageUrl: imageUrl
    });
  }

  return (<>
    <h4>Want to help us with our pet team?</h4>
    <form className={`myapp-petform form-inline ${className ?? ""}`}>
      <div className="form-group" data-testid="name-input">
        <input ref={nameRef} type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter a pet name" />
      </div>
      <div className="form-group" data-testid="type-input">
        <PetSelector value={pet.current} onChange={value => pet.current = value} />
      </div>
      <button onClick={onAddClick} type="button" className="btn btn-primary mb-2">Add new pet</button>
    </form>
  </>
  );
}
