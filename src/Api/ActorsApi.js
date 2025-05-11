import axios from "axios";
const baseUrl = "http://localhost:3001/people";
const getAllActors = async () => axios.get(baseUrl);

const getActorById = async (id) => axios.get(`${baseUrl}/${id}`);

const addNewActor = async (Actor) => axios.post(baseUrl, Actor);
const updateActor = async (id, Actor) => axios.put(`${baseUrl}/${id}`, Actor);
const deleteActor = async (id) => axios.delete(`${baseUrl}/${id}`);

export { getAllActors, getActorById, addNewActor, updateActor, deleteActor };
