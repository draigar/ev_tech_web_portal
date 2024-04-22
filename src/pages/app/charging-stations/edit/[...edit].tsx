import React, { useCallback, useEffect, useState } from "react";

import { DefaultLayout } from "web/layouts";
import { GreetingText } from "web/components";
import Image from "next/image";
import { OpenNotification } from "web/helper";
import { apiTypes } from "web/types";
import { createChargingStationFormType } from "web/types/chargingStationType";
import { useChargingStations } from "web/hooks";
import { useRouter } from "next/router";

export default function UpdateChargingStation() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [slotNumber, setSlotNumber] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [oldImage, setOldImage] = useState('');

    let queryData: any = router.query.edit;
    const id = queryData && queryData[1];
    const stationName = queryData && queryData[0]

    const { updateStation, getSingleStation, chargingStates } = useChargingStations();
    const { stationSingleData } = chargingStates;

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

                    updateStation.mutate({ payload, id: id }, {
                        onSuccess: (val: apiTypes) => {
                            if (val.status) {
                                OpenNotification({
                                    description: `Station ${name} has been updated`,
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
        } else {
            const payload: createChargingStationFormType = {
                address: address,
                city: city,
                description: description,
                name: name,
                number_of_slots: parseInt(slotNumber, 10),
                state: state,
            }

            updateStation.mutate({ payload, id: id }, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            description: `Station ${stationName} has been updated`,
                            type: 'success'
                        })
                        resetForm();
                        router.back()
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
    };

    const getSingle = useCallback(async () => {
        if (id) {
            const result = stationSingleData
            if (result) {
                const data: any = result;
                setAddress(data.address);
                setName(data.name);
                setCity(data.city);
                setDescription(data.description);
                setState(data.state);
                setOldImage(data.image);
            }
        }
    }, [id, stationSingleData])

    useEffect(() => {
        const mId = queryData && queryData[1];
        getSingleStation.mutate({ id: mId })
    }, [queryData])

    useEffect(() => {
        getSingle()
    }, [getSingle])

    return (
        <DefaultLayout title={`Update charging station - ${stationName}`}>
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Update charging station" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Update your charging station data</p>
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
                                                            <div className="d-flex flex-column">
                                                                <label htmlFor="image" className="form-label p-0 m-0">Station image</label>
                                                                {selectedImage && <span className="text-body-emphasis text-info" style={{ fontSize: '10px' }}>Click image to change</span>}
                                                            </div>
                                                            <input type="file" className="d-none" id="imageInput" accept=".png,.jpg,.jpeg" onChange={handleImageChange}></input>
                                                            <div className="">
                                                                <div onClick={() => document.getElementById('imageInput')?.click()}
                                                                    className="w-full p-4 d-flex justify-content-center align-items-center border border-3 border-info border-dotted" style={{ cursor: 'pointer' }}>
                                                                    <p className="p-0 m-0">Click to upload image</p>
                                                                </div>
                                                                <div className="mt-4">
                                                                    {oldImage && (
                                                                        <Image alt="" src={oldImage} width={200} height={200} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={updateStation.isLoading} onClick={() => DoStationCreate()}> {updateStation.isLoading ? 'Sending to server...' : 'Update Station'}</button>
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