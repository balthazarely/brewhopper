export function AdminBreweryInfo({
  onSubmit,
  handleSubmit,
  brewery,
  errors,
  register,
  previewUrl,
  isLoading,
  CloudImage,
  uploadFileHandler,
}: any) {
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-lg w-full"
      >
        <h2 className="text-xl w-full font-bold">Edit listing</h2>
        <div className="grid grid-cols-2 gap-2 mt-6">
          <div className={`flex flex-col col-span-2`}>
            <label htmlFor="name" className="capitalize text-sm">
              name <span className="text-error">*</span>
            </label>
            <input
              id="name"
              type="text"
              defaultValue={brewery.name}
              className={`input input-bordered input-sm w-full ${
                errors.name ? "input-error" : ""
              }
                `}
              {...register("name", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-2`}>
            <label htmlFor="description" className="capitalize text-sm">
              description <span className="text-error">*</span>
            </label>
            <input
              id="description"
              type="text"
              defaultValue={brewery.description}
              className={`input input-bordered input-sm w-full ${
                errors.description ? "input-error" : ""
              }
                `}
              {...register("description", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-2`}>
            <label htmlFor="address" className="capitalize text-sm">
              address <span className="text-error">*</span>
            </label>
            <input
              id="address"
              type="text"
              defaultValue={brewery.address}
              className={`input input-bordered input-sm w-full ${
                errors.address ? "input-error" : ""
              }
                `}
              {...register("address", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-2`}>
            <label htmlFor="city" className="capitalize text-sm">
              city <span className="text-error">*</span>
            </label>
            <input
              id="city"
              type="text"
              defaultValue={brewery.city}
              className={`input input-bordered input-sm w-full ${
                errors.city ? "input-error" : ""
              }
                `}
              {...register("city", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-1`}>
            <label htmlFor="state" className="capitalize text-sm">
              state <span className="text-error">*</span>
            </label>
            <input
              id="state"
              type="text"
              defaultValue={brewery.state}
              className={`input input-bordered input-sm w-full ${
                errors.state ? "input-error" : ""
              }
                `}
              {...register("state", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-1`}>
            <label htmlFor="zip" className="capitalize text-sm">
              zip <span className="text-error">*</span>
            </label>
            <input
              id="zip"
              type="number"
              defaultValue={brewery.zip}
              className={`input input-bordered input-sm w-full ${
                errors.zip ? "input-error" : ""
              }
                `}
              {...register("zip", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-2`}>
            <label htmlFor="website" className="capitalize text-sm">
              website <span className="text-error">*</span>
            </label>
            <input
              id="website"
              type="text"
              defaultValue={brewery.website}
              className={`input input-bordered input-sm w-full ${
                errors.website ? "input-error" : ""
              }
                `}
              {...register("website", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-1`}>
            <label htmlFor="phoneNumber" className="capitalize text-sm">
              phoneNumber <span className="text-error">*</span>
            </label>
            <input
              id="phoneNumber"
              type="number"
              defaultValue={brewery.phone_number}
              className={`input input-bordered input-sm w-full ${
                errors.phoneNumber ? "input-error" : ""
              }
                `}
              {...register("phoneNumber", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-1`}>
            <label htmlFor="checkInCode" className="capitalize text-sm">
              checkInCode <span className="text-error">*</span>
            </label>
            <input
              id="checkInCode"
              type="text"
              defaultValue={brewery.check_in_code}
              className={`input input-bordered input-sm w-full ${
                errors.checkInCode ? "input-error" : ""
              }
                `}
              {...register("checkInCode", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-1`}>
            <label htmlFor="lat" className="capitalize text-sm">
              lat <span className="text-error">*</span>
            </label>
            <input
              id="lat"
              type="number"
              defaultValue={brewery.lat}
              className={`input input-bordered input-sm w-full ${
                errors.lat ? "input-error" : ""
              }
                `}
              {...register("lat", { required: true })}
            />
          </div>
          <div className={`flex flex-col col-span-1`}>
            <label htmlFor="long" className="capitalize text-sm">
              long <span className="text-error">*</span>
            </label>
            <input
              id="long"
              type="number"
              defaultValue={brewery.long}
              className={`input input-bordered input-sm w-full ${
                errors.long ? "input-error" : ""
              }
                `}
              {...register("long", { required: true })}
            />
          </div>

          <select
            className={`input input-bordered w-full  col-span-2   input-sm mt-4 ${
              errors.type ? "input-error" : ""
            }`}
            defaultValue={brewery.type}
            {...register("type", { required: true })}
          >
            <option value="">Select Type</option>
            <option value="brewery">Brewery</option>
            <option value="winery">Winery</option>
            <option value="distillery">Distillery</option>
            <option value="cidery">Cidery</option>
          </select>

          <div className="w-full h-44 mt-3 col-span-2 rounded-lg relative">
            <label htmlFor="photo" className="capitalize text-sm">
              Photo
            </label>
            <div className="mt-4 w-72 overflow-hidden  h-40">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-44" />
              ) : (
                <CloudImage image={brewery.image} width={300} height={400} />
              )}
            </div>
          </div>
          <div className={`flex flex-col col-span-2 mt-6`}>
            <input
              id="photo"
              type="file"
              onChange={(e) => uploadFileHandler(e)}
              className="file-input file-input-sm   file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>

          <input className="btn btn-primary mt-4" type="submit" />
          {isLoading && "loading"}
        </div>
      </form>
    </>
  );
}
