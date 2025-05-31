import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {
    const {store, dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    function searchContactDetail(id) {
        // search the store for a contact with this id (in the url)
        const requiredContact = store.contacts.find((contact) => {
            if (contact.id == id) return true;
            return false; 
        });
        if (!requiredContact) navigate("/");
        // if we found the contact, update the inputs with its values
        setName(requiredContact.name);
        setPhone(requiredContact.phone);
        setAddress(requiredContact.address);
        setEmail(requiredContact.email);
    };
    async function saveContact() {
        // validate inputs
        if (name === "" || phone === "" || email === "" || address === "" ) throw new Error(
            "either name, phone, email, or address are missing... check your inputs 😐"
        );
        // create request body
        const requestBody = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        const url = `${store.BASE_URL}/${store.SLUG}/contacts/${params.contactId}`;
        // fetch post to api
        const response = await fetch(
            url, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const body = await response.json();
        if (!response.ok) throw new Error(`status:${response.status}, message:${body}`);
        navigate("/");
    };
    useEffect(() => {
        if (!params.contactId) return;
        searchContactDetail(params.contactId);
    }, [params]);
    return (
        <div className="row">
            <div className="d-flex w-100 flex-column">
                <form>
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="some name" type="text" className="form-control" name="name" />
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+1 xxxxxxxx" type="text" className="form-control" name="phone" />
                    <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="some@gmail.not" type="email" className="form-control" name="email" />
                    <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="some address" type="text" className="form-control" name="address" />
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={(event) => saveContact()}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};