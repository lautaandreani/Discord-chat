import { Avatar } from "@material-ui/core";
import { Badge } from "@chakra-ui/layout";

const Mensaje = ({ mensajeFirebase }) => {
  const { foto, usuario, mensaje } = mensajeFirebase;

  return (
    <div className="message">
      <Avatar src={foto} />
      <div className="message__info">
        <h4>
          {usuario === "Lautaro Andreani" ? (
            <div>
              {usuario}
              <Badge colorScheme="green" ml={3}>
                {" "}
                ADMIN
              </Badge>
            </div>
          ) : (
            <div>
              {usuario}
              <Badge ml={3}>USUARIO</Badge>
            </div>
          )}
        </h4>
        <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default Mensaje;
