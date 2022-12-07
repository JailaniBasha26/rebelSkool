import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios'
import { Toast } from 'primereact/toast';
import './AddOrganization.css'

class AddOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationNo: '',
            organizationName: '',
            ceoName: '',
            phone: '',
            address: '',
            formValues: [{ name: "", email: "" }],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.push('/');
    }

    handleChange(i, e) {
        let formValues = this.state.formValues;
        formValues[i][e.target.name] = e.target.value;
        this.setState({ formValues });
    }

    addFormFields() {
        this.setState(({
            formValues: [...this.state.formValues, { name: "", email: "" }]
        }))
    }

    removeFormFields(i) {
        let formValues = this.state.formValues;
        formValues.splice(i, 1);
        this.setState({ formValues });
    }

    handleSubmit(event) {
        const { formValues, organizationNo, organizationName, ceoName, phone, address } = this.state;
        let revenue = '';
        let result = false
        event.preventDefault();
        formValues.map(val => {
            if (revenue == '') {
                revenue = "{'" + val.name + "':" + val.email + '}'
            }
            else {
                revenue = revenue.slice(0, -1);
                revenue = revenue + ",'" + val.name + "':" + val.email + '}'
            }
        })
        var rrs = axios
            .post('/insertOrganization', {
                organizationname: organizationName,
                organizationno: organizationNo,
                ceo: ceoName,
                phone: phone,
                address: address,
                revenue: revenue
            })
            .then((data) => { this.toast.show({ severity: 'success', summary: 'Successfully Inserted', detail: '', life: 3000 }) })
            .catch((err) => { this.toast.show({ severity: 'error', summary: 'Not Inserted', detail: '', life: 3000 }) })

        // if 

        this.setState({
            organizationNo: '', organizationName: '', ceoName: '',
            phone: '', address: '', formValues: [{ name: "", email: "" }]
        })

    }


    render() {
        return (
            <div className='parent' >
                <div className='goBack'>
                    <Button label="Back" aria-label="Back" onClick={() => this.goBack()}
                        id='submit' />
                </div>

                <Toast ref={(el) => this.toast = el} />
                <b>Organization No.</b>
                <br />
                <InputText id="inputtext" value={this.state.organizationNo} onChange={(e) => this.setState({ organizationNo: e.target.value })} />
                <br />
                <br />
                <b>Organization Name</b>
                <br />
                <InputText id="inputtext" value={this.state.organizationName} onChange={(e) => this.setState({ organizationName: e.target.value })} />
                <br />
                <br />
                <b>CEO</b>
                <br />
                <InputText id="inputtext" value={this.state.ceoName} onChange={(e) => this.setState({ ceoName: e.target.value })} />
                <br />
                <br />
                <b>Phone</b>
                <br />
                <InputText id="inputtext" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                <br />
                <br />
                <b>Address</b>
                <br />
                <InputText id="inputtext" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                <br />

                <div>
                    <form onSubmit={this.handleSubmit}>
                        {this.state.formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                                <label>Year</label>
                                <input type="text" name="name" value={element.name || ""} onChange={e => this.handleChange(index, e)} />
                                <label>Revenue</label>
                                <input type="text" name="email" value={element.email || ""} onChange={e => this.handleChange(index, e)} />
                                {
                                    index ?
                                        <button type="button" className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button>
                                        : null
                                }
                            </div>
                        ))}
                        <div className="button-section">
                            <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
                            <button className="button submit" type="submit">Submit</button>
                        </div>
                    </form>
                </div>


            </div>

        )
    }
}

export default AddOrganization;