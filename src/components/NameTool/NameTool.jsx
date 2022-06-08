import React, { useState } from "react";
import './NameTool.css';
import FileUpload from "./FileUpload";
import Recorder from "./Recorder";
import Preferences from "./Preferences";
import Loading from "./Loading";
import { useEffect } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { base64toBlob } from "../../common";
import axios from "axios";

function NameTool() {
    const [selectedName, setSelectedName] = useState(null);
    const [phonetics, setPhonetics] = useState("");
    const [empDetails, setEmpDetails] = useState(null);
    const [itemsList, setItemsList] = useState([]);

    const [prefPronunciation, setPrefPronunciation] = useState("");
    // const [togglePronounce, setTogglePronounce] = useState(false);
    // const [audioData, setAudioData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecordSuccess, setIsRecordSuccess] = useState(false);
    const [isUpload, setIsUpload] = useState(false);

    const [isSavePref, setIsSavePref] = useState(false);
    const baseUrl = "https://wfnps.azurewebsites.net/names";
    const phoneticsBaseUrl = "https://wf-phonetics-api.azurewebsites.net/name";


    useEffect(() => {
        axios.get(baseUrl).then(response => {
            setItemsList(response.data)
        });

    }, []);

    // useEffect(() => {
    //     if (selectedName !== null) setTogglePronounce(true);
    // }, [selectedName])

    const onStopSelect = (audioData, fromUpload) => {
        // setAudioData(audioData);
        setPrefPronunciation(fromUpload ? base64toBlob(audioData) : audioData.url);
        if (fromUpload) {
            setIsUpload(true);
            setIsRecordSuccess(false);
            setIsSavePref(false);
        } else {
            setIsUpload(false);
            setIsRecordSuccess(true);
            setIsSavePref(false);
        }
    }

    const onUserChange = (_event, newVal) => {
        if (newVal && newVal !== "" && newVal.id) {
            setIsLoading(true);
        } else return;
        setSelectedName(null);
        setPrefPronunciation("");
        // setAudioData(null);
        setSelectedName(newVal);
        axios.get(`${baseUrl}/${newVal.id}`).then(response => {
            axios.get(`${phoneticsBaseUrl}/${getName(newVal, true).toLowerCase()}`).then(phoneticsResponse => setPhonetics(phoneticsResponse.data));
            setPrefPronunciation(base64toBlob(response.data.prefPronunciation));
            setEmpDetails(response.data);
            setIsLoading(false);
        });
    }

    const getName = (chosenName, isPhonetics) => {
        let framedName = "";
        if (chosenName) framedName = chosenName.prefName ? chosenName.prefName : `${chosenName.legalFName}${isPhonetics ? "": ","} ${chosenName.legalLName}`
        return isPhonetics ? framedName.toLowerCase() : framedName;
    }

    const playPrefName = () => {
        document.getElementById("prefPronunciation").play();
    }

    const onSavePref = () => {
        setIsLoading(true);
        setPrefPronunciation("");
        // setAudioData(null);
        axios.get(`${baseUrl}/${selectedName.id}`).then(response => {
            setPrefPronunciation(base64toBlob(response.data.prefPronunciation));
            setEmpDetails(response.data);
            setIsLoading(false);
            setIsSavePref(true);
            setIsUpload(false);
            setIsRecordSuccess(false);
        });
    }

    const handleAlertClose = () => {
        if (isRecordSuccess) setIsRecordSuccess(false);
        else if (isUpload) setIsUpload(false);
        else setIsSavePref(false);
    }
    return (
        <>
            {(itemsList && itemsList.length > 0) ? (<>
                {(isRecordSuccess || isSavePref || isUpload) && (<Alert onClose={handleAlertClose} severity="success">
                    You have successfully {isRecordSuccess ? "recorded your audio" : isUpload ? "uploaded your audio" : "saved your preferences"}
                </Alert>)}
                <div className="tool-body">
                    <div className="name-search">
                        <Autocomplete
                            id='autocompleteSearch'
                            options={itemsList}
                            renderInput={params => (
                                <TextField {...params} label="Search by Legal First, Legal Last or Preferred Name" variant="outlined" />
                            )}
                            getOptionSelected={(option, value) => option.uId === selectedName.uId}
                            getOptionLabel={(option) => (`${option.legalLName}, ${option.legalFName}` + (option.prefName !== null ? "(" + option.prefName + ")" : ""))}
                            style={{ width: 500 }}
                            value={selectedName}
                            onChange={onUserChange}
                        />
                    </div>
                    {selectedName !== null && prefPronunciation !== "" && (
                        <>

                            <div className="user-details pronounce-name">
                                <span className="name-audio">Pronunciation of {getName(selectedName)}</span>
                                <IconButton size="medium" onClick={playPrefName} >
                                    <VolumeUpIcon /> </IconButton>
                                <audio id="prefPronunciation" className="visually-hidden" src={prefPronunciation} />
                            </div>
                            <div className="user-details">
                                <table>
                                    <tr>
                                        <th>Legal First Name</th>
                                        <th>Legal Last Name</th>
                                        <th>Preferred Name</th>
                                        <th>Phonetics</th>
                                    </tr>
                                    <tr>
                                        <td>{selectedName.legalFName}</td>
                                        <td>{selectedName.legalLName}</td>
                                        <td>{selectedName.prefName}</td>
                                        <td>{phonetics}</td>

                                    </tr>
                                </table>
                            </div>
                            {(sessionStorage.getItem("username") && (sessionStorage.getItem("username").toLowerCase() === "admin" || sessionStorage.getItem("username").toLowerCase() === selectedName.uId) && empDetails !== null) && (
                                <div className="name-customize-tools" style={{ marginTop: 50 }}>

                                    <Preferences userDetails={empDetails} onSavePref={onSavePref} />
                                    <Recorder userDetails={selectedName} onStopSelect={onStopSelect} />
                                    <FileUpload userDetails={selectedName} onStopSelect={onStopSelect} />



                                </div>
                            )}
                        </>
                    )}
                    {isLoading && (<Loading />)}
                </div>
            </>) : <Loading />}</>
    );
}

export default NameTool;
