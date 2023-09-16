/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to send note.
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { FaRegPaperPlane } from "react-icons/fa";
import { Input, InputGroup, InputGroupAddon, Card, CardBody } from "reactstrap";

const ChatInput = () => {
  return (
    <Card style={{ borderRadius: "0" }}>
      <CardBody style={{ padding: "0.5rem" }}>
        <InputGroup className="input-note">
          <Input style={{ border: "0px" }} placeholder="Envoyer une note" />
          <InputGroupAddon addonType="append"></InputGroupAddon>
          <FaRegPaperPlane color="#C531C1" size={20} />
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default ChatInput;
