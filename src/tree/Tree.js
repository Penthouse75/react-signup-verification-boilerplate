import { useState, ChangeEvent } from "react";
// import "./Tree.css";
import FilesUploadComponent from "./files-upload-component";

function Tree() {
    const [file, setFile] = useState();
    const [fileUploaded, setFileUploaded] = useState();

    const handleFileChange = (e) => {//: ChangeEvent) => {
        setFile(e.target.files);
    };

    const handleFile = async (event) => {
        console.log(event);
        const content = event.target.result;
        const CHUNK_SIZE = 1000;
        const totalChunks = event.target.result.byteLength / CHUNK_SIZE;

        //const fileName = this.name; // Math.random().toString(36).slice(-6) + file.name;

        let response;

        for (let chunk = 0; chunk < totalChunks + 1; chunk++) {
            let CHUNK = content.slice(
                chunk * CHUNK_SIZE,
                (chunk + 1) * CHUNK_SIZE
            );
            //console.log(fileName)
            response = await fetch(
                "http://localhost:4000/upload2?fileName=" +
                event.target.fileName,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/octet-stream",
                        "content-length": CHUNK.length,
                    },
                    body: CHUNK,
                }
            );
        }
        // setFileUploaded(fileUploaded + 1);

        console.log(await response.json());
        //status.innerHTML = `file ${fileUploaded} of ${files.files.length} uploaded!!!`;
    };

    const handleUploadFile = async (e) => {
        if (!file) {
            return;
        }

        //status.innerHTML = 'uploading...';
        setFileUploaded(0);
        console.log(file);
        //file.forEach((file1) => {
        for (let fileIndex = 0; fileIndex < file.length; fileIndex++) {
            const file2 = file[fileIndex];

            const fileReader = new FileReader();
            //console.log(file2.name);
            fileReader.fileName = file2.name;
            fileReader.readAsArrayBuffer(file2);

            fileReader.onload = handleFile;
        }
        //console.log("end");
    };

    const handleConvert = async (e) => {
        if (!file) {
            return;
        }
    };

    return (
        <>
            <div className="container">
                <div className="py-3 text-center">
                    <h2>
                        Загрузка информации с сайта{" "}
                        <a href="https://mirsud.spb.ru/cases/?type=civil&id=&full_name">
                            Мировых судей
                        </a>
                    </h2>
                    <p className="lead">
                        Выберите файл для получения информации
                    </p>
                </div>
                <FilesUploadComponent />
                {/*                 <button
                    onClick={handleConvert}
                    className="btn btn-outline-secondary "
                >
                    Загрузить файл
                </button> */}
                {/*                 <div className="row">
                    <div className="col-12"></div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="file"
                            id="formFileMultiple"
                            name="recfile"
                            onChange={handleFileChange}
                            multiple
                        ></input>

                        <button
                            onClick={handleUploadFile}
                            className="btn btn-outline-secondary "
                        >
                            Загрузить файл
                        </button>
                    </div>
                    <div>{file && `${file.name} - ${file.type}`}</div>
                </div> */}
            </div>
        </>
    );
}

export default Tree;
