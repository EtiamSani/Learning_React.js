import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContex from "./AdoptedPetContext";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import Errorboundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContex);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      <Carousel images={pet.images} />
      <div className="ml-20">
        <h1 className="my-auto mb-10 text-2xl font-extrabold">{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.state}
          <button
            className="ml-2 rounded-3xl border-solid bg-red-500 p-2"
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
          <p className="my-10">{pet.description}</p>
          {showModal ? (
            <Modal>
              <div className="container absolute top-80 ml-80 w-80 place-content-center rounded-2xl bg-red-500 py-10 px-0">
                <h1 className="flex place-content-center">
                  Would tou like to adpot {pet.name}?
                </h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                    className="m-auto bg-white"
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorboundary(props) {
  return (
    <Errorboundary>
      <Details {...props} />
    </Errorboundary>
  );
}

export default DetailsErrorboundary;
