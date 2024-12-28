"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

export const AddressForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      //   Todo: leer de la DB
    },
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
      >
        <div className="flex flex-col mb-2">
          <span>Nombres</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("firstName", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Apellidos</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("lastName", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Dirección</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("address", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Dirección 2 (opcional)</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("address2")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Código postal</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("postalCode", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Ciudad</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("city", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>País</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("country", { required: true })}
          >
            <option value="">[ Seleccione ]</option>
            <option value="CRI">Costa Rica</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Teléfono</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("phone", { required: true })}
          />
        </div>

        <div className="end-form flex flex-col">
          <div className="checkbox flex items-center">
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="checkbox"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="flex before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-600 checked:bg-blue-600 checked:before:bg-blue-600 hover:before:opacity-10"
                  id="checkbox"
                  //   checked
                  {...register("rememberAddress")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <FaCheck />
                </div>
              </label>
            </div>
            <p className="w-full mx-auto text-sm text-gray-700">
              Recordar dirección
            </p>
          </div>
          <div className="flex flex-col mb-2 mt-4 sm:mt-8">
            <button
              disabled={!isValid}
              type="submit"
              //   className="btn-primary flex w-full sm:w-1/2 justify-center"
              className={clsx({
                "btn-primary": isValid,
                "btn-disabled": !isValid,
              })}
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
