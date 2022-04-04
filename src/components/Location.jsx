import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import * as locationServices from "../services/locationServices.js"
import OptionsCard from './OptionsCard.jsx';
// import Select from "react-select";

export default class Location extends Component {
    state = {
        formData: {
            city: "",
            zip: ""
        },
        cityOptions: [],
        locationModal: true
    }

    componentDidMount = () => {
        if(localStorage.getItem("coordinates") !== null) {
            this.handleCloseModal()
        }
    }

    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

    }

    handleCloseModal = () => {
        this.setState({
            locationModal: false
        })
    }

    handleChangeCity = (e) => {
        let city = this.state.formData.city
        locationServices
            .getGeocoding(city)
            .then(this.onGetGeocodingSuccess)
            .catch(this.onGetGeocodingError)
    }

    onGetGeocodingSuccess = (res) => {
        //first letter doesn bring up array
        if( res.results !== undefined){
            let data = res.results
            let options = []
            for (let i = 0; i < data.length; i++) {
                let obj = {}
                let label = `${data[i].name}, ${data[i].admin1}, ${data[i].country} `
                obj["value"] = data[i].id
                obj["latitude"] = data[i].latitude
                obj["longitude"] = data[i].longitude
                obj["label"] = label
                options.push(obj)
            }
            this.setState({
                cityOptions: options.map(this.mappedOptions)
            })
        }
    }

    onGetGeocodingError = (res) => {
        console.log(res)
    }

    mappedOptions = (data) => (
        <OptionsCard 
        key={data.value}
        info={data}
        onHandleBtn={this.handleSelectCity}
        />
    )

    handleSelectCity = (e) => {
        let lat = e.info.latitude
        let lon = e.info.longitude
        let coordinates = {lat, lon}
        localStorage.setItem("coordinates", JSON.stringify(coordinates))
        locationServices
            .getWeather(lat, lon)
            .then(this.onGetWeatherSuccess)
            .catch(this.onGetWeatherError)
    }

    onGetWeatherSuccess = (res) => {
        this.setState({
            locationModal: false
        })
        this.props.onHandleWeatherSuccess(res)
    }

    onGetWeatherError = (res) => {
        console.log(res)
    }

    onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(e, name, value)
        this.setState((prevState) => {
            return {
                ...prevState,
                formData: {
                    ...prevState.formData,
                    [name]: value,
                },
            };
        }, () => this.handleChangeCity());
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.state.locationModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Row className="mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="validationCustom03" className="form-label">
                                        City
                                    </label>
                                    {/* <Select
                                        options={this.state.options}
                                        placeholder="City"
                                        isSearchable={true}
                                        onChange={this.onHandleSelect}
                                    /> */}
                                    <input
                                        name="city"
                                        value={this.state.formData.city}
                                        type="text"
                                        className="form-control"
                                        required
                                        onChange={this.onChangeInput}
                                    />
                                    {this.state.cityOptions}
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="validationCustom05" className="form-label">
                                        Zip
                                    </label>
                                    <input
                                        name="zip"
                                        value={this.state.formData.zip}
                                        type="text"
                                        className="form-control"
                                        // required
                                        onChange={this.onChangeInput}
                                    />
                                </div>
                            </Row>
                            {/* <Button type="submit">Submit form</Button> */}
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>


        )
    }
}
