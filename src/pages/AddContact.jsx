import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    async function addContact() {
        // validate inputs
        if (name === "" || phone === "" || email === "" || address === "") throw new Error(
            "either name, phone, email, or address are missing... check your inputs 😐"
        );
        // create request body
        const requestBody = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        const url = `${store.BASE_URL}/${store.SLUG}/contacts`;
        // fetch post to api
        const response = await fetch(
            url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }
        );
        const body = await response.json();
        if (!response.ok) throw new Error(`status:${response.status}, message:${body}`);
        // clear inputs
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
    };
    return (
        <div className="row">
            <div className="d-flex w-100 flex-column">
                <h1 style={{ textAlign: "center" }}>Add a new contact</h1>
                <form>
                    <label className="form-label mb-0 ms-2">Full Name</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" type="text" className="form-control mb-3 fw-light" name="name" />
                    <label className="form-label mb-0 ms-2">Phone</label>
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter Phone" type="text" className="form-control mb-3 fw-light" name="phone" />
                    <label className="form-label mb-0 ms-2">Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" type="email" className="form-control mb-3 fw-light" name="email" />
                    <label className="form-label mb-0 ms-2">Address</label>
                    <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address" type="text" className="form-control fw-light" name="address" />
                </form>
                <button
                    className="btn btn-primary col-md-12"
                    type="button"
                    onClick={(event) => addContact()}>
                    SAVE
                </button>
                
            </div>
        </div>
    );
};