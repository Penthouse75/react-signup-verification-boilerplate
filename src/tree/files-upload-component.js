import React, { Component } from "react";
import axios from "axios";

export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            imgCollection: "",
        };
    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });
    }

    onSubmit(e) {
        e.preventDefault();

        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append("imgCollection", this.state.imgCollection[key]);
        }
        axios
            .post("http://localhost:4000/upload/file", formData, {})
            .then((res) => {
                console.log(res.data);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {/*                     <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="file"
                                name="imgCollection"
                                onChange={this.onFileChange}
                                multiple
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">
                                Upload
                            </button>
                        </div>
                    </form> */}
                </div>

                <div className="row">
                    <div className="col-12"></div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="file"
                            id="formFileMultiple"
                            name="imgCollection"
                            onChange={this.onFileChange}
                            multiple
                        ></input>

                        <button
                            onClick={this.onSubmit}
                            className="btn btn-outline-secondary "
                        >
                            Загрузить файл new
                        </button>
                    </div>
                    {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
                </div>
            </div>
        );
    }
}
