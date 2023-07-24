import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

function ContactList() {
const [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: ''
});

useEffect(() => {
    async function handleResp() {
    try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
        ...state,
        loading: false,
        contacts: response.data
        });
        // console.log(response.data);
    } catch (error) {
        setState({
        loading: false,
        ...state,
        errorMessage: error.message
        });
    }
    }

    handleResp();
}, []);

let { loading, contacts, errorMessage } = state;

return (
    <React.Fragment>
      {/* Rest of your component JSX code */}
    <React.Fragment>
            <pre>{JSON.stringify(contacts)}</pre>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Contact Manager
                                    <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                        <i className="fa fa-plus-circle me-2"></i>
                                        New</Link>
                                </p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque distinctio totam consequuntur velit, voluptatum architecto fuga optio voluptatibus dolorem fugiat sequi cupiditate id corporis hic quidem praesentium qui nihil necessitatibus.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className='row'>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="text" className="form-control" placeholder="Search Names" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-outline-dark" value="Search" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? <Spinner /> : <React.Fragment>
                <section className="contact-list">
                    <div className="container">
                        <div className="row">
                            {contacts.length > 0 && contacts.map(contact => {
                                return (
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row align-items-center d-flex justify-content-aound">
                                                    <div className="col-md-4">
                                                        <img src="https://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/User-icon.png" alt="" className="contact-img" />
                                                    </div>
                                                    <div className="col-md-7">
                                                        <ul className="list-group">
                                                            <li className="list-group-item list-group-item-action">
                                                                Name: <span className="fw bold">Rajan</span>
                                                            </li>
                                                            <li className="list-group-item list-group-item-action">
                                                                Mobile: <span className="fw bold">11111111</span>
                                                            </li>
                                                            <li className="list-group-item list-group-item-action">
                                                                Email: <span className="fw bold">Rajan@gmail.com</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-1 d-flex flex-column align-items-center">
                                                        <Link to={'/contacts/view/:contactId'} className="btn btn-warning my-1">
                                                            <i className="fa fa-eye" />
                                                        </Link>
                                                        <Link to={'/contacts/edit/:contactId'} className="btn btn-primary my-1">
                                                            <i className="fa fa-pen" />
                                                        </Link>
                                                        <button to={'/contacts/view/:contactId'} className="btn btn-danger my-1">
                                                            <i className="fa fa-trash" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}



                        </div>
                    </div>
                </section>
            </React.Fragment>}


        </React.Fragment>
    </React.Fragment>
);
}

export default ContactList;
