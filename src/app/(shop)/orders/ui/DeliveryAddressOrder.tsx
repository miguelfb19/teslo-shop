
interface Props {
    firstName: string,
    lastName: string,
    address: string,
    address2?: string,
    phone: string,
    city: string,
    country: {
        name: string
    }
}

export const DeliveryAddressOrder = ({firstName, lastName, address, address2, phone, city, country}: Props) => {
  return (
    <>
      <h2 className="text-2xl mb-2">Dirección de entrega:</h2>
      <div className="mb-3">
        <p>
          <b>Nombre:</b> {`${firstName} ${lastName}`}
        </p>
        <p>
          <b>Dirección:</b>{" "}
          {`${address}, ${address2 ? address2 + "," : ""} ${city}, ${
            country.name
          }.`}
        </p>
        <p>
          <b>Teléfono:</b> {phone}
        </p>
      </div>
    </>
  );
};
