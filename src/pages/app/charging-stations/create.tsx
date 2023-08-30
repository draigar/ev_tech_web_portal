import Image from "next/image";
import React, { useState } from "react";
import { GreetingText } from "web/components";
import { OpenNotification } from "web/helper";
import { useChargingStations } from "web/hooks";
import { DefaultLayout } from "web/layouts";
import { apiTypes } from "web/types";
import { createChargingStationFormType } from "web/types/chargingStationType";

export default function CreateChargingStation() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [slotNumber, setSlotNumber] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { createStation } = useChargingStations();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setSelectedImage(file);
            // You can also preview the image here before uploading.
            console.log(file);

        }
    };

    const resetForm = () => {
        setAddress('');
        setName('');
        setCity('');
        setDescription('');
        setSlotNumber('');
        setState('');
        setSelectedImage(null);
    }

    const DoStationCreate = () => {
        if (selectedImage) {
            try {

                const reader = new FileReader();
                reader.readAsDataURL(selectedImage);

                reader.onload = async () => {
                    const base64Image = reader.result?.toString();

                    const payload: createChargingStationFormType = {
                        address: address,
                        city: city,
                        description: description,
                        name: name,
                        number_of_slots: parseInt(slotNumber, 10),
                        state: state,
                        image: base64Image,
                    }

                    createStation.mutate(payload, {
                        onSuccess: (val: apiTypes) => {
                            if (val.status) {
                                OpenNotification({
                                    description: `Station ${name} has been created`,
                                    type: 'success'
                                })
                                resetForm();
                            } else {
                                OpenNotification({
                                    description: val.message,
                                    type: 'warning'
                                })
                            }
                        },
                        onError: () => {
                            OpenNotification({
                                description: 'An error occurred, do check your internet connection',
                                type: 'error'
                            })
                        }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
    };

    return (
        <DefaultLayout title="Create Charging Station">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Create charging station" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your charging station data</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Station Name</label>
                                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="description" className="form-label">Station Description</label>
                                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="address" className="form-label">Station Address</label>
                                                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="address" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="city" className="form-label">Station city</label>
                                                            <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="form-control" id="city" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="state" className="form-label">Station state</label>
                                                            <input type="text" required value={state} onChange={(e) => setState(e.target.value)} className="form-control" id="state" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="slot" className="form-label">Number of slots</label>
                                                            <input type="text" required value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} className="form-control" id="slot" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <div className="d-flex flex-column">
                                                                <label htmlFor="image" className="form-label p-0 m-0">Station image</label>
                                                                {selectedImage && <span className="text-body-emphasis text-info" style={{ fontSize: '10px' }}>Click image to change</span>}
                                                            </div>
                                                            <input type="file" className="d-none" id="imageInput" accept=".png,.jpg,.jpeg" onChange={handleImageChange}></input>
                                                            {selectedImage ? (
                                                                <div className="d-flex" onClick={() => document.getElementById('imageInput')?.click()}>
                                                                    <Image alt="" src={URL.createObjectURL(selectedImage)} width={200} height={200} />
                                                                </div>
                                                            ) : (
                                                                <div onClick={() => document.getElementById('imageInput')?.click()}
                                                                    className="w-full p-4 d-flex justify-content-center align-items-center border border-3 border-info border-dotted" style={{ cursor: 'pointer' }}>
                                                                    <p className="p-0 m-0">Click to upload image</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={createStation.isLoading} onClick={() => DoStationCreate()}> {createStation.isLoading ? 'Sending to server...' : 'Create Station'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto layout-rightside-col"></div>
                        </div>
                    </div>
                </div>
            </main>
        </DefaultLayout>
    )
}