import { useState } from 'react';
import './App.css';
import { Pet } from './model/pet';
import { PetForm } from './components/PetForm/PetForm';
import { PetList } from './components/PetList/PetList';

const initialPets: Pet[] = [
  {
    imageUrl: "https://cdn2.thedogapi.com/images/fbl5hbwrc.jpg",
    name: "Toby",
    type: "dog"
  },{
    imageUrl: "https://cdn2.thecatapi.com/images/a37.jpg",
    name: "Buddy",
    type: "cat"
  }
]

function App() {
  const [myPets, setMyPets] = useState<Pet[]>(initialPets);

  const addPet = (pet: Pet) => {
    setMyPets(value => [
      ...value,
      { ...pet }
    ])
  }

  return (
    <div className="App">

      <header>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              <strong>&nbsp;My pets</strong>
            </a>
          </div>
        </div>
      </header>
      <div className="myapp-content">
        <PetForm addPet={addPet} />
        <PetList myPets={myPets} />
      </div>
    </div>
  );
}

export default App;
