import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";

export const Contacts = () => {
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    async function deleteContact(id) {
        const url = `${store.BASE_URL}/${store.SLUG}/contacts/${id}`;
        const response = await fetch(url, {
            method: "DELETE"
        });
        if (!response.ok) {
            const body = await response.json();
            throw new Error(`status:${response.status}, message:${body}`);
        }
        await fetchTasks();
    };
    async function fetchTasks() {
        // fetch our tasks
        // fetch(url, {});
        const url = `${store.BASE_URL}/${store.SLUG}`;
        const response = await fetch(url);
        const body = await response.json();
        if (!response.ok) throw new Error(`status:${response.status}, message:${body}`);
        // update the store contacts with the response body
        dispatch({
            type: "SET_CONTACTS",
            payload: body.contacts
        });
    };
    async function createTask() {
        fetch(`${store.BASE_URL}/${store.SLUG}`)
    }
    useEffect(() => {
        fetchTasks();
    }, []);
    
    return (
        <div className="d-flex flex-column w-100">
            {store.contacts.map((contact) => {
                return <ContactCard contact={contact} onEdit = {() =>{
                    navigate (`/contacts/${contact.id}`)
                }} onDelete= {()=>{
                    deleteContact(contact.id)
                }} />
                  
            })}
                   
                    
        </div>
    );
};
 