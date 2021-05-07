import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PetSelector } from './PetSelector/PetSelector';

function App() {
  const pet = useRef<"cat" | "dog">("cat");
  const nameRef = useRef<HTMLInputElement>(null);
  const [myPets, setMyPets] = useState<any[]>([]);

  const addPet = () =>{
    setMyPets(value => [...value, {
      name: nameRef.current?.value,
      type: pet.current,
      img: "https://cdn2.thedogapi.com/images/B1Edfl9NX_1280.jpg"
    }]);
  }

  return (
    <div className="App">

      <header>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              <strong>&nbsp;My pets</strong>
            </a>
          </div>
        </div>
      </header>
      <form className="myapp-petform">
        <div className="form-group" data-testid="name-input">
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter name" />
        </div>
        <div className="form-group" data-testid="type-input">
          <label htmlFor="type">Type</label>
          <PetSelector value={pet.current} onChange={value => pet.current = value} />
        </div>
        <button onClick={addPet} type="button" className="btn btn-primary">Add my pet</button>
      </form>
      <div>
        {myPets.map(pet => 
        <figure className="figure">
          <img width="200" src={pet.img} className="figure-img img-fluid rounded" alt={pet.name} />
          <figcaption className="figure-caption text-right">{pet.name}</figcaption>
        </figure>
        )}
      </div>

    </div>
  );
}

export default App;
