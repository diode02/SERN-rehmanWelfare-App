import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { InputMask } from "primereact/inputmask";
import { FileUpload } from "primereact/fileupload";
import Webcam from "react-webcam";

// import { store } from "../../redux/store";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { postCustomerStart } from "../../redux/customers/customers.actions";
const NewCustomer = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.customers.error);
  const customers = useSelector((state) => state.customers.customers);
  const prevCustomer = usePrevious(customers);
  const [displayBasic, setdisplayBasic] = useState(false);
  const [visibleChoose, setVisibleChoose] = useState(false);
  const webcamRef = React.useRef(null);
  const [cameraShow, setCameraShow] = useState(false);

  let toast;

  useEffect(() => {
    if (prevCustomer)
      if (prevCustomer.length - customers.length === -1) {
        setdisplayBasic(!displayBasic);
        toast.show({
          severity: "Success",
          summary: "Success Message",
          detail: "Message Content",
          life: 3000,
        });
        setCustomerData({
          customer_id: "",
          first_name: "",
          last_name: "",
          mobile_number: "",
          home_other_number: "",
          address: "",
          city: "",
          note: "",
          photo: null,
        });
      }
  }, [customers, displayBasic, prevCustomer, toast]);

  const [customerData, setCustomerData] = useState({
    customer_id: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    home_other_number: "",
    address: "",
    city: "",
    note: "",
    photo: null,
  });
  const {
    customer_id,
    first_name,
    last_name,
    mobile_number,
    home_other_number,
    address,
    city,
    note,
    photo,
  } = customerData;
  const onClickMainDialog = () => {
    setdisplayBasic(true);
  };

  const onHideMainDialog = () => {
    setdisplayBasic(false);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const onHide = () => {
    setCameraShow(false);
    setVisibleChoose(false);
  };

  const onClick = () => {
    setCameraShow(true);
  };

  const onHideChoose = () => {
    setVisibleChoose(false);
  };

  const onClickChoose = () => {
    setVisibleChoose(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postCustomerStart(customerData));
  };
  const myUploader = (picture) => {
    setCustomerData({ ...customerData, photo: picture.files[0] });
    onHideChoose();
  };
  const clearPhoto = () => {
    setCustomerData({ ...customerData, photo: null });
  };

  const capture = React.useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setCustomerData({ ...customerData, photo: imgSrc });
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)}></Toast>
      <Dialog
        header="Capture Photo"
        visible={cameraShow}
        style={{ width: "24.5vw" }}
        modal
        onHide={onHide}
      >
        <Webcam
          audio={false}
          height={420}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={420}
          videoConstraints={videoConstraints}
        />
        <Button label="Take Photo" onClick={capture} />
      </Dialog>

      <Dialog
        header="Choose Method"
        visible={visibleChoose}
        style={{ width: "25vw" }}
        modal
        onHide={onHideChoose}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <FileUpload
            name="demo[]"
            url="./upload.php"
            auto
            mode="basic"
            accept="image/*"
            customUpload
            uploadHandler={myUploader}
            maxFileSize={1000000}
            style={{
              cursor: "pointer",
            }}
          />

          <Button
            label="Capture"
            icon="pi pi-external-link"
            onClick={onClick}
            style={{
              marginLeft: "20px",
            }}
          />
        </div>
      </Dialog>
      <Button
        label="Add Customer"
        icon="pi pi-external-link"
        onClick={() => onClickMainDialog()}
        style={{
          float: "right",
        }}
      />
      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <Dialog
        header="Add Customer"
        visible={displayBasic}
        style={{ width: "70vw" }}
        onHide={onHideMainDialog}
      >
        <form
          className="p-fluid p-formgrid p-grid nested-grid"
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
          }}
        >
          <div className="p-col-8">
            <div className="p-grid">
              <div className="p-col-12 p-mb-5">
                <div className="box">
                  <label htmlFor="cnic">Customer CNIC Number</label>
                  <InputMask
                    id="cnic"
                    mask="999999999999999"
                    name="customer_id"
                    type="text"
                    value={customer_id}
                    onChange={onChange}
                    required
                    // autoClear={false}
                  />
                </div>
              </div>
              <div className="p-col-6 p-mb-4">
                <div className="box">
                  <label htmlFor="firstname">First Name</label>
                  <InputText
                    id="firstname"
                    name="first_name"
                    type="text"
                    maxLength="45"
                    value={first_name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="p-col-6 p-mb-4">
                <div className="box">
                  <label htmlFor="lastname">Last Name</label>
                  <InputText
                    id="lastname"
                    type="text"
                    name="last_name"
                    maxLength="45"
                    value={last_name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="p-col-6 p-mb-4">
                <label htmlFor="mobile">Mobile Number</label>
                <InputText
                  id="mobile"
                  type="number"
                  max="99999999999999"
                  min="99"
                  name="mobile_number"
                  value={mobile_number}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="p-col-6 p-mb-4">
                <label htmlFor="other_mobile">Other Number</label>
                <InputText
                  id="other_mobile"
                  type="number"
                  max="99999999999999"
                  min="99"
                  name="home_other_number"
                  value={home_other_number}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="p-col-4">
            <div
              className="box box-stretched"
              style={{
                width: "100%",
                height: "250px",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  customerData.photo && customerData.photo[0] != "d"
                    ? URL.createObjectURL(customerData.photo)
                    : customerData.photo
                }
                style={{
                  width: "100%",
                  height: "85%",
                }}
              ></img>
              <div
                style={{
                  display: "flex",
                  marginTop: "7px",
                  justifyContent: "center",
                }}
              >
                <span
                  icon="pi pi-external-link"
                  onClick={onClickChoose}
                  className="p-tag"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Choose Picture
                </span>
                <span
                  icon="pi pi-external-link"
                  onClick={clearPhoto}
                  className="p-tag"
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </span>
              </div>
            </div>
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="address">Address</label>
            <InputTextarea
              id="address"
              name="address"
              type="text"
              maxLength="230"
              rows="4"
              value={address}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              type="text"
              value={city}
              maxLength="42"
              onChange={onChange}
              name="city"
              required
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="note">Any note about customer</label>
            <InputTextarea
              id="note"
              maxLength="97"
              type="text"
              rows="4"
              value={note}
              onChange={onChange}
              name="note"
            />
          </div>
          <div className="p-field p-col-12">
            <label>{error ? "something went wrong" : ""}</label>
          </div>
          <div
            className="p-p-4"
            style={{
              marginInlineStart: "auto",
            }}
          >
            <Button
              type="submit"
              label="Add Customer"
              className="p-d-block p-mx-auto"
              icon="pi pi-user-plus"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default NewCustomer;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
