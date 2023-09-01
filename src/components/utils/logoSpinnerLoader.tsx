import Image from "next/image"

export const LogoSpinnerLoader = () => {
    return (
        <div className="position-absolute d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75 top-0 left-0 right-0 bottom-0" style={{ zIndex: 60, width: '100%' }}>
            <Image alt="" src="/images/sterling-bank-plc.png" width={50} height={50} className="rotating" />
            <p className="text-white">Loading resources</p>
        </div>
    )
}