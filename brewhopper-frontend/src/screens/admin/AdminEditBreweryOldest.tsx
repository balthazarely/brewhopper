import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBreweryQuery,
  useUpdatedBreweryMutation,
} from "../../slices/brewerySlice";
import { FormEvent, useEffect, useState } from "react";
import { PageWrapper } from "../../components/elements";

export default function AdminEditBreweryScreen() {
  const { id } = useParams();
  const { data: brewery, isLoading, error } = useGetBreweryQuery(id);
  const navigate = useNavigate();
  const [updateBrewery] = useUpdatedBreweryMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [checkInCode, setCheckInCode] = useState("");

  useEffect(() => {
    if (brewery) {
      setName(brewery?.breweryInfo.name);
      setDescription(brewery?.breweryInfo.description);
      setType(brewery?.breweryInfo.type);
      setAddress(brewery?.breweryInfo.address);
      setLat(brewery?.breweryInfo.lat);
      setLong(brewery?.breweryInfo.long);
      setWebsite(brewery?.breweryInfo.website);
      setPhoneNumber(brewery?.breweryInfo.phone_number);
      setCheckInCode(brewery?.breweryInfo.check_in_code);
    }
  }, [brewery]);

  const handleSaveChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedBrewery = {
      breweryId: id,
      name,
      description,
      type,
      address,
      lat,
      long,
      website,
      phoneNumber,
      checkInCode,
    };
    try {
      await updateBrewery(updatedBrewery);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageWrapper>
      {!isLoading ? (
        <form onSubmit={(e) => handleSaveChanges(e)} className="flex flex-col">
          <h2 className="text-xl font-bold mt-8">Edit Listing</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">name</span>
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">description</span>
            </label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">type</span>
            </label>
            <input
              type="text"
              onChange={(e) => setType(e.target.value)}
              value={type}
              placeholder="Type"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">Address</span>
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">lat</span>
            </label>
            <input
              type="text"
              onChange={(e) => setLat(e.target.value)}
              value={lat}
              placeholder="lat"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">Long</span>
            </label>
            <input
              type="text"
              onChange={(e) => setLong(e.target.value)}
              value={long}
              placeholder="Long"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">Website</span>
            </label>
            <input
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              placeholder="Website"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text capitalize text-xs">
                Phone Number
              </span>
            </label>
            <input
              type="text"
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
              value={phoneNumber}
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xs capitalize">
                Check in Code
              </span>
            </label>
            <input
              type="text"
              onChange={(e) => setCheckInCode(e.target.value)}
              value={checkInCode}
              placeholder="Check in Code"
              className="input input-bordered w-full max-w-xs input-primary  input-sm "
            />
          </div>
          <div>
            <button className="btn mt-6 btn-secondary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        "loading"
      )}
    </PageWrapper>
  );
}
