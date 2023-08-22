import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
// import PhoneInput from "react-phone-input-2";
const ManageProfileForm = ({ user, setUpdateData }) => {
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0]);
  const [lastName, setLastName] = useState(user?.name?.split(" ")[1]);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [state, setState] = useState(user?.state);
  const [gender, setGender] = useState(user?.gender);
  const [description, setDescription] = useState(user?.description);
  const [address, setAddress] = useState(user?.address);
  const [zip, setZip] = useState(user?.pincode || 0);
  useEffect(() => {
    let record = {
      name: firstName + " " + lastName,
      city,
      country,
      state,
      description,
      address,
      gender,
      profile_id: user.id,
      pincode: zip,
    };
    setUpdateData(record);
    // eslint-disable-next-line
  }, [
    firstName,
    lastName,
    city,
    country,
    state,
    description,
    address,
    gender,
    zip,
  ]);
  return (
    <div>
      <Form.Row>
        <Form.Group as={Col} controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* <Form.Text className='text-muted'>in case of error</Form.Text> */}
        </Form.Group>

        <Form.Group as={Col} controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* <Form.Text className='text-muted'>in case of error</Form.Text> */}
        </Form.Group>
      </Form.Row>
      <Form.Group as={Col} controlId='gender'>
        <Form.Label>Gender</Form.Label>
        <Form.Check
          type='radio'
          name='gender'
          value='male'
          label='Male'
          onChange={(e) => setGender(e.target.value)}
          checked={gender === "male"}
        />
        <Form.Check
          type='radio'
          name='gender'
          value='female'
          inline
          label='Female'
          onChange={(e) => setGender(e.target.value)}
          checked={gender === "female"}
        />
      </Form.Group>
      {/* <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          value={user.username}
          disabled
        />
        <Form.Text className='text-muted'>in case of error</Form.Text>
      </Form.Group>

      <Form.Group controlId='email'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          value={user.email}
          placeholder='Enter email'
          disabled
        />
        <Form.Text className='text-muted'>in case of error</Form.Text>
      </Form.Group>
      <Form.Group controlId='phoneNumber'>
        <Form.Label>Phone number</Form.Label>
        <PhoneInput
          enableSearch
          autocompleteSearch
          country={"in"}
          value={user.phone}
          disabled
          required
        />
        <Form.Text className='text-muted'>in case of error</Form.Text>
      </Form.Group> */}
      <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Enter Description'
          value={description === "null" ? "" : description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Enter address'
          value={address === "null" ? "" : address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city === "null" ? "" : city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country === "null" ? "" : country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId='state'>
          <Form.Label>State</Form.Label>
          <Form.Control
            as='select'
            defaultValue='Choose...'
            onChange={(e) => setState(e.target.value)}
          >
            <option>Choose...</option>
            <option>Andhra Pradesh</option>
            <option>Arunachal Pradesh</option>
            <option>Bihar</option>
            <option>Chhattisgarh</option>
            <option>Goa</option>
            <option>Gujarat</option>
            <option>Haryana</option>
            <option>Himachal Pradesh</option>
            <option>Jharkhand</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Manipur</option>
            <option>Meghalaya</option>
            <option>Mizoram</option>
            <option>Nagaland</option>
            <option>Odisha</option>
            <option>Punjab</option>
            <option>Rajasthan</option>
            <option>Sikkim</option>
            <option>Tamil Nadu</option>
            <option>Telangana</option>
            <option>Tripura</option>
            <option>Uttar Pradesh</option>
            <option>Uttarakhand</option>
            <option>West Bengal</option>
            <option>Andaman and Nicobar Islands</option>
            <option>Delhi</option>
            <option>Jammu and Kashmir</option>
            <option>Dadra and Nagar Haveli and Daman and Diu</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId='zip'>
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter zip'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
    </div>
  );
};

export default ManageProfileForm;
