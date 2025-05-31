import { useState } from "react";


export default function ContactCard({ contact, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    onDelete(contact.id);
  };
  return (
    <>

      {showConfirm && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(207, 204, 204, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this contact?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="container">
        <div className="row mt-6 border rounded shadow p-4">
          <div className="col d-flex justify-content-center">
            <img src="https://randomuser.me/api/portraits/men/81.jpg" className="rounded-circle" />
          </div>

          <div className="col align-self-center">
            <h4 className="font-semibold text-lg">{contact.name}</h4>
            <p className="m-0">< i className="fa-solid fa-location-dot" />{contact.address}</p>
            <p className="m-0">< i className="fa-solid fa-phone" />{contact.phone}</p>
            <p className="m-0">< i className="fa-solid fa-envelope" />{contact.email}</p>
          </div>

          <div className="col d-flex justify-content-end align-items-center gap-5">
            < i className="fa-solid fa-pencil" onClick={() => onEdit(contact.id)} />
            <i className="fa-solid fa-trash" onClick={() => setShowConfirm(true)} />
          </div>
        </div>
      </div>
    </>
  );
}